import express from 'express';
import axios from 'axios';
import RepoConfig from '../models/RepoConfig.js';

const router = express.Router();

/*
 * Middleware to ensure that the user is authenticated before allowing
 * access to the protected API routes.  Passport adds isAuthenticated()
 * to the request object.
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authenticated' });
}

/*
 * GET /api/repos
 * Returns a list of the user's repositories augmented with the
 * Auto Review flag.  Currently only GitHub provider is fully
 * implemented.  You can extend this logic for GitLab and Bitbucket
 * using their respective APIs.
 */
router.get('/repos', ensureAuthenticated, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: 'Not authenticated' });
  try {
    if (user.provider === 'github') {
      const ghResponse = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `token ${user.accessToken}` }
      });
      const repos = ghResponse.data;
      const configs = await RepoConfig.find({ userId: user._id, provider: 'github' });
      const configMap = {};
      configs.forEach((cfg) => {
        configMap[cfg.repoId] = cfg.autoReviewEnabled;
      });
      const result = repos.map((repo) => ({
        id: String(repo.id),
        name: repo.full_name,
        stars: repo.stargazers_count,
        defaultBranch: repo.default_branch,
        autoReview: configMap[String(repo.id)] || false
      }));
      return res.json(result);
    } else {
      return res.status(400).json({ error: 'Provider not supported yet' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching repositories' });
  }
});

/*
 * POST /api/repos/:provider/:repoId/auto-review
 * Toggles the auto review setting for the given repository.
 */
router.post('/repos/:provider/:repoId/auto-review', ensureAuthenticated, async (req, res) => {
  const { provider, repoId } = req.params;
  const userId = req.user._id;
  try {
    let cfg = await RepoConfig.findOne({ userId, repoId: String(repoId), provider });
    if (!cfg) {
      cfg = new RepoConfig({ userId, repoId: String(repoId), provider, autoReviewEnabled: true });
    } else {
      cfg.autoReviewEnabled = !cfg.autoReviewEnabled;
    }
    await cfg.save();
    return res.json({ repoId: cfg.repoId, autoReview: cfg.autoReviewEnabled });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error updating configuration' });
  }
});

/*
 * GET /api/repos/:provider/:repoId/stats
 * Returns repository statistics including stars, default branch, auto review
 * status and (optionally) total line count.  Currently implemented for GitHub.
 */
router.get('/repos/:provider/:repoId/stats', ensureAuthenticated, async (req, res) => {
  const { provider, repoId } = req.params;
  const user = req.user;
  try {
    if (provider === 'github') {
      const repoResp = await axios.get(`https://api.github.com/repositories/${repoId}`, {
        headers: { Authorization: `token ${user.accessToken}` }
      });
      const repo = repoResp.data;
      const cfg = await RepoConfig.findOne({ userId: user._id, repoId: String(repoId), provider });
      // TODO: implement line counting.  For now return 0.
      const totalLines = 0;
      return res.json({
        id: String(repo.id),
        name: repo.full_name,
        stars: repo.stargazers_count,
        defaultBranch: repo.default_branch,
        autoReview: cfg?.autoReviewEnabled || false,
        lines: totalLines
      });
    } else {
      return res.status(400).json({ error: 'Provider not supported yet' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching repository stats' });
  }
});

/*
 * GET /api/profile
 * Returns basic profile information and a count of auto-review enabled repos.
 */
router.get('/profile', ensureAuthenticated, async (req, res) => {
  const user = req.user;
  try {
    const enabledCount = await RepoConfig.countDocuments({ userId: user._id, autoReviewEnabled: true });
    res.json({
      name: user.name,
      email: user.email,
      provider: user.provider,
      totalAutoReviewRepos: enabledCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

export default router;