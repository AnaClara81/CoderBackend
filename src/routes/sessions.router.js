import { Router } from 'express'
const router = Router()
import SessionsController from '../controllers/sessions.controller.js'
import passport from 'passport'
import passportCall from '../passport.jwt/passportCall.js'//rutas con proteccion
import authorization from '../passport.jwt/authorizacionJwtRole.js'
const login = SessionsController.login
const register =SessionsController.register
router
    .post('/login',login)
    .post('/register',register)
    .get('/current',
       passportCall('jwt'),
       authorization('user'),
        (req,res)=>{
         res.send('current')
    })



export default router