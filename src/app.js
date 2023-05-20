import express from 'express'// se trae el modulo express
import cookieParser from 'cookie-parser'  
import uploader from '../src/utils/multer.utils.js'
import userRouter from'./routes/users.router.js'
import productRouter from'./routes/products.router.js'
import routerCar from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import routerServer from './routes/index.js'
import mongoose from 'mongoose'
import  connectDb  from './config/configServer.js'
import connect from 'mongoose';


//----------------------------------------------------------------
import { Server } from 'socket.io';
import socketChat from './utils/socketChat.js';
import socketProducts from './utils/socketProducts.js';
const app = express()

connectDb();

const PORT = 8080


const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)

//---------------------------------------------------

//hbs-------------------------------------------------------------------------------
import path from 'path';
import handlebars from 'express-handlebars'
app.engine('handlebars', handlebars.engine())// inicializamos el motor de plantillas
app.set('views',path.join( __dirname+'/views')) //adonde va a buscar las carpetas
app.set('view engine', 'handlebars')//para que use el motor de plantilla



//hbs---------------------------------------------------------------------------------


app.use(express.json()) // body-parser
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser())



 

/* app.use('/', viewsRouter)
app.use('/register', viewsRouter)
//app.use('/chat', viewsRouter)*/


//http://localhost:8080 /api/usuarios
//app.use('/api/usuarios',  userRouter)


//router de productos
app.use('/api/products', productRouter)

//router de carrito
app.use('/api/carts', routerCar ) 

app.use(routerServer)

app.post('/upload', uploader.single('myFile'), (req,res)=>{
    res.send({
        status:'success',
        mensaje:'Archivo subido con exito'
    })
}) 


socketChat(io)
socketProducts(io)
   
/* socket.emit('evento-para-socket-individual','Este mensaje lo va a recibir un cliente socket')
    
   socket.broadcast.emit('evt-p-todo-menos-el-socket-actual','Evento que veran todos los sockets menos el actual')
    
   socketServer.emit('evt-para-todos','este mensaje lo reciben todos los socket conectados')
    
    
    let logs = []
    socket.on("message1", data =>{
        socketServer.emit('log',data);
    })
    //message2 se utiliza para la parte de almacenar y devolver
    socket.on("message2", data =>{
        logs.push({socketid:socket.id,message:data})
        socketServer.emit('log',{logs});
        
    }) */


///socketProduct(io) // ERROR socketProduct is not defined



app.use((err, req, res, next) => {
    console.log(err)
     res.status(500).send('Todo mal')
     
}) 


export default __dirname