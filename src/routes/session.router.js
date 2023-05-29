import { Router } from 'express'
const router = Router()
import auth from '../middlewares/autenticacion.middlewares.js'
import userModel from '../managerDaos/mongo/model/user.model.js'
import bcrypt from '../utils/bcryptHash.js'
import {createHash} from '../utils/bcryptHash.js'
import {isValidPassword} from '../utils/bcryptHash.js'
import passport from 'passport';

 ////sesiones


/* router.post('/login',async(req,res)=>{
    const{email,password} = req.body
    //validar email y  password 

    //vamos a tner una funcion para validar el password
    const userDb = await userModel.findOne({email,password})

    if(!userDb) return res.send({status:'error', message:'No existe ese usuario'})
   
    //validar password
     if(isValidPassword(password,userDb)) return res.status(401).send({
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
    
})*/



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
   //console.log(newUser);
}) */
//login
router.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}), async (req,res)=>{
    if(!req.user) return res.status(401).send({status:'error', message:'invalid credencial'})
    req.session.user ={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role:req.user.role
    }
    console.log(req.user.first_name);
    console.log(req.user.role)
    res.redirect(`/api/products?nombreUsuario=${req.user.first_name}&rol=${req.user.role}`);

})
//message:'User registered'
router.get ('/faillogin', async (req, res)=>{
    console.log('Fallo estrategia')
    res.send({status:'error', error:'fallo autenticacion'})
    })



//success redirect
router.post ('/register', passport.authenticate('register',{failureRedirect:'/failregister'}), async(req,res)=>{
      res.send({ status:'succes', message:'User registered'})
})

router.get ('/failregister', async (req, res)=>{
     console.log('Fallo estrategia')
     res.send({status:'error', error:'fallo autenticacion'})
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