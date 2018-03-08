const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Config files
const config = require('./../config');

// Mongoose models
const userModel = require('../user/models.js');
const roleModel = require('../role/models.js');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.SECRET_KEY;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    userModel.getById(jwt_payload.user._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        roleModel.findOne({user_id:user.id}, (err, role) => {
          user = JSON.parse(JSON.stringify(user));
          user.role = role.type;
          return done(null, user);
        });
      } else {
        return done(null, false);
      }
    });
  }));
};
