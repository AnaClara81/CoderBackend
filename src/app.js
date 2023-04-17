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

//----------------------------------------------------------------
import { Server } from 'socket.io';
const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const socketServer = new Server(httpServer)





//---------------------------------------------------

//hbs-------------------------------------------------------------------------------

//const handlebars = require ('express-handlebars').engine

import handlebars from 'express-handlebars'

app.engine('handlebars', handlebars.engine())
app.set('views','./views')
app.set('view engine', 'handlebars')

//hbs---------------------------------------------------------------------------------


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

app.get('/chat',(req, res)=>{
res.render('chat',{})
})


socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    console.log(socket.id);

 /*   socket.on('message',data => {
        console.log(data)
    })

    socket.emit('evento-para-socket-individual','Este mensaje lo va a recibir un cliente socket')

    socket.broadcast.emit('evt-p-todo-menos-el-socket-actual','Evento que veran todos los sockets menos el actual')
    
    socketServer.emit('evt-para-todos','este mensaje lo reciben todos los socket conectados')*/


    let logs = []
    socket.on("message1", data =>{
        io.emit('log',data);
    })
  //message2 se utilñiza para la parte de almacenar y devolver
  socket.on("message2", data =>{
    logs.push({socketid:socket.id,message:data})
    io.emit('log',{logs});

  })
})

app.use((err, req, res, next) => {
    console.log(err)
     res.status(500).send
     
})



/*const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})*/

// localhost= 127.0.0.1
