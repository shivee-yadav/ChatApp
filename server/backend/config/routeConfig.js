
const JwtPassport = require("passport-jwt");
const User = require("../models/User");


const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ChatApp"
};

export default (passport) => {
    passport.use(

        new  JwtStrategy(options, async(jwt__payload, done) => {
            try{
                const doesUserExist =  User.findById(jwt__payload.user);
                if (!doesUserExist) return done(null, false);

                return done(null,  doesUserExist);

            } catch(error){

                throw new Error(error);

            }
        })
    );
};