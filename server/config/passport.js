import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';

// Serialize the user into the session. Only the user ID is stored.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session. Fetch the full user from the DB.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/*
 * GitHub OAuth Strategy
 * Requests access to the user's repositories and basic profile.
 */
if (process.env.GITHUB_CLIENT_ID) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback',
        scope: ['user:email', 'repo']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({
            provider: 'github',
            providerUserId: profile.id
          });
          if (!user) {
            user = new User({
              provider: 'github',
              providerUserId: profile.id,
              name: profile.displayName || profile.username,
              email: profile.emails?.[0]?.value || '',
              accessToken
            });
          } else {
            user.accessToken = accessToken;
          }
          await user.save();
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}



// Export passport to ensure the file is executed when imported
export default passport;
