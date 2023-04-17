import express from 'express'// se trae el modulo express
import cookieParser from 'cookie-parser'  
//import uploader from '../utils/multer.utils.js'
import productRouter from'./routes/products.router.js'
import routerCar from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//import __dirname from './utils/dirname.js'
//const path = './utils/dirname.js';

//----------------------------------------------------------------
import { Server } from 'socket.io';


const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

//const socketServer = new Server(httpServer)

const io = new Server(httpServer)



//---------------------------------------------------

//hbs-------------------------------------------------------------------------------

import handlebars from 'express-handlebars'
//import socketProduct from './utils/socketProduct.js'

app.engine('handlebars', handlebars.engine())// inicializamos el motor de plantillas
app.set('views', __dirname+'/views') //adonde va a buscar las carpetas
app.set('view engine', 'handlebars')//para que use el motor de plantilla

//hbs---------------------------------------------------------------------------------


app.use(express.json()) // body-parser
app.use(express.urlencoded({extended: true}))
//app.use('/static', express.static('/src/public'))
app.use('/static', express.static(__dirname+'/src/public'))
app.use(cookieParser())


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

let food =[
    {name:'Hamburguesa', price:150},
    {name:'Pizza', price:250},
    {name:'Papas fritas', price:100},
    {name:'Pancho', price:130},
    {name:'Lomito', price:250},
];

const users = [
    {
        nombre:'Ana',
        apellido:'Rmirez',
        edad:35,
        correo:'anar@gmail.com',
        telefono:'555-3456',
        role:'user'
    },
    {
        nombre:'Miguel',
        apellido:'Fernandez',
        edad:45,
        correo:'migue@gmail.com',
        telefono:'258-9631',
        role:'admin'
    },
    {
        nombre:'Pedro',
        apellido:'Perez',
        edad:38,
        correo:'pp@gmail.com',
        telefono:'258-7896',
        role:'user'
    },
    {
        nombre:'Carlos',
        apellido:'Benitez',
        edad:55,
        correo:'charli@gmail.com',
        telefono:'444-7788',
        role:'admin'
    },
    {
        nombre:'Mirta',
        apellido:'Sanchez',
        edad:65,
        correo:'mirta@gmail.com',
        telefono:'444-6644',
        role:'user'
    }
];
//esta no la muestra
app.get('/vista', (req, res)=>{
let user = users[Math.floor( Math.random() * users.lenght)]
    
let testUser = {
   title:'mercadito',
   user,
   isAdmin: users.role === 'admin',
   food,
   style:'index.css'
   
} 

res.render('index', testUser)
}) 

//esta la muestra

 /*app.get('/vista', (req,res) =>{
         let testUser={
         nombre:'ana',
         apellido:'eceiza',
         title:'mercadito',

    }
    res.render('index',testUser)
 })*/  

app.use('/', viewsRouter)


//router de productos
app.use('/api/products', productRouter)

//router de carrito
app.use('/api/carts', routerCar)



app.get('/chat',(req, res)=>{
res.render('chat',{})
})



io.on('connection', socket => {
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
        socketServer.emit('log',data);
    })
    //message2 se utilñiza para la parte de almacenar y devolver
    socket.on("message2", data =>{
        logs.push({socketid:socket.id,message:data})
        socketServer.emit('log',{logs});
        
    })
})

//socketProduct(io)  ERROR socketProduct is not defined



app.use((err, req, res, next) => {
    console.log(err)
     res.status(500).send('Todo mal')
     
})



/*const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})*/

// localhost= 127.0.0.1
export default __dirname