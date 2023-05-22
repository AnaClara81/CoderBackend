function auth(req,res,next){
    if(req.session?.user !== 'ana' && req.session?.admin ){
        return res.status(401).send ('Error de autenticación')
    }
    next ()
}


export default auth