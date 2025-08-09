import express from 'express';
import passport from 'passport';

const router = express.Router();

/*
 * Initiate authentication with a provider.  This route simply hands
 * control over to Passport which then redirects the user to the
 * provider's consent screen.
 */
router.get('/:provider', (req, res, next) => {
  const provider = req.params.provider;
  if (!['github', 'gitlab', 'bitbucket'].includes(provider)) {
    return res.status(400).send('Unsupported provider');
  }
  passport.authenticate(provider)(req, res, next);
});

/*
 * Handle the callback after the user has authenticated with the
 * provider.  On success we redirect to the client URL (home page).
 */
router.get('/:provider/callback', (req, res, next) => {
  const provider = req.params.provider;
  passport.authenticate(provider, {
    failureRedirect: `${process.env.CLIENT_URL || '/'}/login`
  })(req, res, () => {
    // Successful authentication, redirect to app
    res.redirect(process.env.CLIENT_URL || '/');
  });
});

/*
 * Log the user out.  Passport exposes a logout() function on req.
 */
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

export default router;