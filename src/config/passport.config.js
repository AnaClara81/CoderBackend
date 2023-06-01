import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
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
    
            if(!isValidPassword(password, userDb))return done(null, false)
            return done(null, userDb)

        } catch (error) {
            return done (error)
        }
    }))
 

}


    const initPassportGithub = () =>{
        passport.use('github', new GithubStrategy({
            clientID:'Iv1.194af9dd48c77e70',
            ClientSecret:'e6f088fc221f08c20af3f499db8f0f06d9795290',
            callbackURL:'http://localhost:8080/api/session/githubcallback'
        }, async ( accessToken, refreshToken, profile, done) =>{
            console.log('Profile', profile)
            try{
                let user =await userModel.findOne({email: profile._json.email})
                if(!user){
                    let newUser={
                        first_name: profile.username,
                        last_name: profile.username,
                        email:'pedro@gmail.com',
                        password:''
                    }
                    let result = await userModel.create(newUser)
                    return done(null, result)
                }
                return done (null, user)
            }catch(error){
               console.log(error)
            }
        }))
        passport.serializeUser((user,done)=>{
            done(null, user._id)
        })
        passport.deserializeUser(async (id,done)=>{
            let user =await userModel.findOne({_id :id})
            done(null, user)
        })
    }


  

    

export { initPassport, initPassportGithub }

 