const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserController = require('../controllers/user.controller');

module.exports = passport => {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    options.secretOrKey = 'itcanbeanysecretkeyword';

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        UserController.findById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user.toJSON());
        })
    }))
}