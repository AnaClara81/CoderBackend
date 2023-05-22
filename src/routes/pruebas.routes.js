import { Router } from 'express'
const router = Router()
import auth from '../middlewares/autenticacion.middlewares.js'
router.get('/setCookie', (req,res)=>{//setear una cookie del lado del cliente
              //nombre del campo, valor, tiempo de vida
     res.cookie('CoderCookie',' Esta es un cookie poderosa',{maxAge: 10000000}).send('Cookie seteada')

})
router.get('/setSignedCookie', (req,res)=>{
     res.cookie('SignedCookie',' Esta es un cookie poderosa',{maxAge: 10000000, signed: true}).send('Cookie seteada')

})

router.get('/getCookie', (req,res)=>{
     res.send(req.cookies)

})
router.get('/getSignedCookie', (req,res)=>{
     res.send(req.signedCookies)

})


router.get('/deleteCookie', (req,res)=>{
      res.clearCookie('CoderCookie').send('cookie removed')

})

//ejercicio

router.get('/', (req,res)=>{
     res.render('login',{})

})

router.post('/setcookieuser', (req,res)=>{
     const {username,email} = req.body

     res.cookie(username,email,{maxAge: 10000000, signed: true}).send({mensaje:'seteado'})
})


////sesiones
 router.get('/session',(req,res)=>{
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

router.post('/session',(req,res)=>{
     const{username,password} =req.body
     if(username !== 'ana' || password  !== 'ana123' ){
      res.send('login failed')
     }
          req.session.user = username
          req.session.admin = false
       console.log(req.session)
          res.send('Login succes')
     
 })

 router.get('/logout', (req, res)=>{
     req.session.destroy (err =>{
          if(err){
              return res.send({status:'error, error:err'})
          }
          res.send('logout ok')
     })
 })




     export default router