const passport = require('passport');
const local = require('passport-local');
// const passportJWT = require('passport-jwt')
const userModel = require('../Dao/models/userModel');
// const { createHash, isValidPassword } = require('../utils/utils');
const cartModel = require('../Dao/models/cartModels');

const LocalStrategy = local.Strategy;


// const JWTStrategy = passportJWT.Strategy
// const extractJWT = passportJWT.ExtractJwt

const cookieExtractor = (req) => {
    console.log(req.cookies)
    return req.cookies && req.cookies.authToken
    //     // return req.headers && req.headers['authorization'] && req.headers['authorization'].replace('Bearer ', '')
}

const initializePassport = () => {
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








    // passport.use('jwt', new JWTStrategy({
    //     jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
    //     secretOrKey: 'jwtsecret'
    // }, (jwtPayload, done) => {
    //     console.log({ jwtPayload })
    //     done(null, jwtPayload.user)
    // }))

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {

            try {

                const existe = await userModel.findOne({ email: username });
                // console.log()
                if (existe) {
                    console.log('ya existe');
                    return done(null, false);
                }

                const newUser = {
                    name: req.body.name,
                    email: username,
                    password: createHash(password),
                }


                const usuario = await userModel.create(newUser);

                return done(null, usuario);



            } catch (error) {

                return done(error);

            }

        }
    ));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {

            try {

                const existe = await userModel.findOne({ email: username }).populate('cart');
                console.log(existe.cart)
                if (!existe) {
                    console.log('no existe');
                    return done(null, false, {
                        message: 'no existe el usuario'
                    });
                }

                if (!isValidPassword(password, existe.password)) {
                    return done(null, false, {
                        message: 'credenciales incorrectas'
                    });
                }

                if (!existe.cart) {
                    const newCart = await cartModel.create({
                        name: 'default'
                    })

                    await userModel.updateOne({ _id: existe._id }, { cart: newCart._id })
                }
                return done(null, existe);

            } catch (error) {

            }

        }
    ))


    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id).populate('cart');

        return done(null, user);
    });
}


module.exports = initializePassport;



