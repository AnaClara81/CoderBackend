////const express = require('express')
//const userRouter = require('./ruotes/users.router')
//const productRouter = require('./routes/products.router')
//import userRouter from './routes/users.router.js'
import express from 'express'// se trae el modulo express
import cookieParser from 'cookie-parser'  
import productRouter from'./routes/products.router.js'
import routerCar from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
//import uploader from '../utils/multer.utils.js'
import __dirname from './utils/dirname.js';
const path = './utils/dirname.js';
const app = express()
//hbs-------------------------------------------------------------------------------

//const handlebars = require ('express-handlebars').engine

import handlebars from 'express-handlebars'

app.engine('handlebars', handlebars.engine())
app.set('views', '/views')
app.set('view engine', 'handlebars')

//hbs---------------------------------------------------------------------------------

const PORT = 8080
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})
app.use(express.urlencoded({extended: true}))
app.use(express.json()) // body-parser

//app.use(cookieParser())

app.use('/static', express.static('../src/public'))

/*app.use((req,res,next)=>{
    console.log('mid app - time: ', Date.now())
    next()
} )*/

function mid1(req,res,next){
    req.dato1 ='dato uno'
    res.send('No tenes permiso para ver los usuarios')
}

function mid2(req,res,next){
    req.dato2 = 'dato dos'
   next()
}



app.use('/', viewsRouter)
// GET http://localhost:8080 /usuarios
//app.use('api/usuarios',mid1, userRouter)
    

//router de productos
app.use('/api/products', productRouter)

//router de carrito
app.use('/api/carts', routerCar)

/*app.use('/single',uploader.single('myFile') ,(req, res)=>{
    res.status(200).send({
        status:'success',
        mesage:'se subio correctamente'
    })
})*/



app.use((err, req, res, next) => {
    console.log(err)
     res.status(500).send('Todo mal')
})



/*const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})*/

// localhost= 127.0.0.1
