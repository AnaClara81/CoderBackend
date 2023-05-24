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





 




     export default router