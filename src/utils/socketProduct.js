import productManager from '../managerDaos/productManager.js'
const productManager = new productManager()

const socketProduct = async (io) =>{
 const products = await productManager.getProducts()
    io.on('connection', socket => {
        console.log('cliente conectado')
        
        socket.emit('productos', products)
    })
}
 //module.exports ={
 //   socketProduct
 //}

 export default socketProduct;