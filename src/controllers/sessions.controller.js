import { generateToken } from "../utils/jwt.js"

class SessionsController {
    login =(req,res)=>{
        const{email,password} = req.body
        const user = {
        //first_name:'pedro',
        //last_name:'campo', 
        email:req.body.email,
        role:'user',
    } 
    const token = generateToken(user)
    
    res.cookie('coderCookieToken', token,{
       maxAge: 60*60*100,
       httpOnly:true
     })
    .send({
        status:'success',
        message:'login success',
        token
        })
    
 }

    register =(req,res) =>{
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
       
     }
    
    }


export default new SessionsController()
