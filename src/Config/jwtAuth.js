const passport =require('passport');
const jwt = require('jsonwebtoken');


const JWTStrategy = jwt.Strategy;
const  ExtractJWT = jwt.ExtractJwt;

const initializePassport=()=>{
    passport.use('jwt',new JWTStrategy({
        jwtFromRecuest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrkey:'jwtsecret',
    },async(jwt_payload,done)=>{
        try{
            return done(null,jwt_payload);
        }
        catch(e){
            return done(e);
        }
    }
    ))
    const cookieExtractor = req =>{
        let token = null;
        if(req && req.cookies){
            token = req.cookies['userCookieToken']
        }
        return token
    }

}
module.exports = initializePassport;