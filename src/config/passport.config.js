import passport from 'passport'
import local from 'passport-local'
import userModel from '../managerDaos/mongo/model/user.model.js'
import {createHash} from '../utils/bcryptHash.js'
import {isValidPassword} from '../utils/bcryptHash.js'

const LocalStrategy = local.Strategy

const initPassport = () => {
    //configurar el registro
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'

    }, async (req, username, password, done)=>{
         const {first_name, last_name} = req.body
          try {
             let userDb = await userModel.findOne({ email:username})
             if(userDb) return done(null, false)

             let newUser ={
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email:username,
              password:createHash(password)
            }
            
            let result = await userModel.create(newUser)
            return done(null, result)
          } catch (error) {
            return done('Error al obtener el usuario'+ error)
          }
    }))


    passport.serializeUser((user, done) => {
       done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userModel.findOne({_id:id})
        done(null, user)
    })

    passport.use('login', new LocalStrategy({
        usernameField:'email'
    }, async(username, password, done)=>{
        const userDb = await userModel.findOne({email:username})
        try {
            
            if(!userDb) return done(null, false)
    
            if(!isValidPassword(password,userDb))return done(null, false)
            return done(null, userDb)

        } catch (error) {
            return done (error)
        }
    }))



    //passport.use('login', new LocalStrategy({},async()=>{}))
}
    





export default initPassport