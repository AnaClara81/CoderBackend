import { Router } from 'express'
const router = Router()
import auth from '../middlewares/autenticacion.middlewares.js'
import userModel from '../managerDaos/mongo/model/user.model.js'

////sesiones


router.post('/login',async(req,res)=>{
    const{email,password} = req.body
    //validar email y password

    //vamos a tner una funcion para validar el password
    const userDb = await userModel.findOne({email, password})
    if(!userDb) return res.send({status:'error', message:'No existe ese usuario'})
   
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
    
})



router.post('/register',async (req,res)=>{
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
    password  //encriptar
}
let {resultUser} = await userModel.create(newUser)

    res.status(200).send({
        status:'succes',
        message:'Usuario creado correctamente',
        //resultUser
    })
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