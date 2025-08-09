import mongoose from 'mongoose';

/*
 * RepoConfig schema stores per-user configuration for repositories.
 * autoReviewEnabled indicates whether the user has enabled the auto review
 * feature for the specific repository.
 */
const repoConfigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  repoId: { type: String, required: true },
  provider: { type: String, required: true },
  autoReviewEnabled: { type: Boolean, default: false }
});

export default mongoose.model('RepoConfig', repoConfigSchema);