 /* function auth(req,res,next){
    if(req.session?.user !== 'ana' && req.session?.admin ){
        return res.status(401).send ('Error de autenticación')
    }
    next ()
} */


 function auth(req,res,next){

    
     console.log('auth', req.session)
     if(req.session?.user?.first_name !== 'pedro' && !req.session?.user?.admin !=='admin'){
         return res.status(401).send ('Error de autenticación')
        }
    next () 
}  


export default auth