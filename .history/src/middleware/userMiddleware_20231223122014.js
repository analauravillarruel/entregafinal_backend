


class UserMiddlerware{
  constructor(){

  }

  isAuth(req ,res , next) {
      const authHeader = req.headers.authorization

      const token = authHeader.replace('bearer ')

      console.log({token});

      return next()

  }


}

module.exports = UserMiddlerware