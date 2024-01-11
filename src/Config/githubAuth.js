const GitHubStrategy = require('passport-github2');
const userModel = require('../Dao/models/userModel');

module.exports = (passport) => {
    passport.use('github', new GitHubStrategy({
      clientID: 'Iv1.9c1d9a31a531b474',
      clientSecret: 'f6dd312f20e3124b89979ed9e1c17399bc5bbd05',
      callbackURL: 'http://localhost:8080/api/session/github-callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email });

            if (user) {
                console.log('Usuario ya existe');
                return done(null, user);
            }

            const newUser = await userModel.create({
                username: profile._json.login,
                email: profile._json.email
            });

            return done(null, newUser);
        } catch (e) {
            return done(e);
        }
    }));
};