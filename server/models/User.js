import mongoose from 'mongoose';

/*
 * User schema stores authentication details for each provider.  The
 * accessToken field contains the OAuth token used to call the provider's API.
 */
const userSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  providerUserId: { type: String, required: true },
  name: String,
  email: String,
  accessToken: String
});

export default mongoose.model('User', userSchema);