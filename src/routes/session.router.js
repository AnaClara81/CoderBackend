import { Router } from 'express'
const router = Router()
import auth from '../middlewares/autenticacion.middlewares.js'
import userModel from '../managerDaos/mongo/model/user.model.js'
import bcrypt from '../utils/bcryptHash.js'
import {createHash} from '../utils/bcryptHash.js'
import {isValidPassword} from '../utils/bcryptHash.js'
import passport from 'passport';
import {generateToken,authToken} from '../utils/jwt.js'
//import passportCall from '../passport.jwt/passportCall.js'
//import authorization from '../passport.jwt/authorizacionJwtRole.js'
 ////sesiones


 /* router.post('/login',async(req,res)=>{
    const{email,password} = req.body
    //validar email y  password 

    //vamos a tner una funcion para validar el password
    const userDb = await userModel.findOne({email})

    if(!userDb) return res.send({status:'error', message:'No existe ese usuario'})
   
    //validar password
     if(!isValidPassword(password, userDb)) return res.status(401).send({
        status:'error',
        message:'El usuario o la contraseña no son correctos'
     }) 
     req.session.user ={
        first_name:userDb.first_name,
        last_name:userDb.last_name, 
        email:userDb.email, 
        role: 'admin'
    }
    res.send({
        status:'success',
        message:'login success',
        session :req.session.user
    })
    
}) */


/* router.post('/register',async (req,res)=>{
    const {username,first_name, last_name, email,password} = req.body
    //validar si vienen vacios y caracteres especiales

    //validar si existe el mail

const existUser = await userModel.findOne({email})
if(existUser) return res.send ({status:'error', message:'el mail ya esta registrado'})

const newUser = {
    username,
    first_name,
    last_name,
    email,
    password: createHash(password)

}
let {resultUser} = await userModel.create(newUser)

    res.status(200).send({
        status:'succes',
        message:'Usuario creado correctamente',
    })
   console.log(newUser);
})  */



//login
    router.post('/login',passport.authenticate('login', {failureRedirect:'/faillogin'}), async (req,res)=>{
    try{
        const {email,password} = req.body
   
    if(!req.user) return res.status(401).send({status:'error', message:'invalid credencial'})
    req.session.user ={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
    }
    if(email === "admin@admin.com"){
        req.session.user.role ="admin" 
    }else{
        req.session.user.role ="user"
    }
    
    console.log(req.session.user);
    console.log(req.user.first_name);
    console.log(req.session.user.role)
    res.redirect(`/api/products`);

}catch(error){
    console.log((error));
}
})
 
 

 

//success redirect
router.post ('/register', passport.authenticate('register',{failureRedirect:'/failregister'}), async(req,res)=>{
      res.send({ status:'succes', message:'User registered'})
}) 


router.get ('/faillogin', async (req, res)=>{
    console.log('Fallo estrategia')
    res.send({status:'error', error:'fallo autenticacion'})
    })


router.get ('/failregister', async (req, res)=>{
     console.log('Fallo estrategia')
     res.send({status:'error', error:'fallo autenticacion'})
     })

/// github

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), ()=>{})
 router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/session/login'}), async (req, res)=>{
    req.session.user = req.user
    res.redirect('/api/products')
 })

 



/* router.post('/login',async(req,res)=>{
    const{email,password} = req.body
   
 const acces_token = generateToken({
        first_name:'pedro',
        last_name:'campo', 
        email:'pedro@gmail.com',
        role:'user'
     })
    res.cookie('coderCookieToken', acces_token,{
       maxAge: 60*60*100,
       httpOnly:true
     })
    .send({
        status:'success',
        message:'login success',
        })
    
 }) */
 //router.get ('/current', passport.authenticate('jwt',{session:false}),(req,res)=>{
       // res.send(req.user)
    // })


// // si viene corrupto o no viene

// // validar el role
// router.get ('/current', passportCall('jwt'),authorization('user'),(req,res)=>{
//     res.send(req.user)
// })


router.post('/register', async (req, res) => {   
      try {
        const {username,first_name, last_name, email, password} = req.body 

         let token = generateToken({
            first_name: 'pedro',
             last_name: 'campo',
             email: 'pedro@gmail.com'
        })
    
    
        res.status(200).send({
             status: 'success',
            message: 'Usuario creado correctamente',
             token
         })
     } catch (error) {
         console.log(error)
    }
   
 })


 

router.get('/logout', (req, res)=>{
    req.session.destroy (err =>{
         if(err){
             return res.send({status:'error, error:err'})
            }
            res.send('logout ok')
        })
})

router.get('/counter',(req,res)=>{
    if(req.session.counter){
     req.session.counter ++
     res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    }else{
         req.session.counter =1
         res.send('Bienvenido')
    }
})

router.get('/privada',auth,(req,res) =>{
    res.send ('Todo lo que esta aca solo lo puede ver un admin logueado')
})
export default router