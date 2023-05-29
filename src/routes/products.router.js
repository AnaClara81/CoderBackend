import { Router } from 'express'
import productManagerMongo from '../managerDaos/mongo/product.mongo.js'
//import productManager from '../managerDaos/productManager.js'
//import socketProducts from '../utils/socketProducts'
import productManager from '../managerDaos/productManager.js'
import productModel from '../managerDaos/mongo/model/product.model.js'
const router = Router()

 
//import productManager from '../managerDaos/productManager.js'
//import uploader from "../utils/multer.utils.js";

import express from 'express'// se trae el modulo express


router.get('/', async (req,res)=>{
    try{
        const nombreUsuario = req.query.nombreUsuario;
        const rol = req.query.rol;
    //const products = await productManagerMongo.getProducts()
     const {page=1} = req.query
     const products = await productModel.paginate({},{limit:5, page, lean:true})
        const { docs, hasPrevPage, hasNextPage,prevPage, nextPage, totalPage } = products
        res.render('products',{
            nombreUsuario: nombreUsuario,
            rol: rol,
            status: 'success',
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
          });
        console.log(products)
       // const products = await productManagerMongo.getOrderProduct()
         //res.send({status: 'success', payload: products})
    }catch(error) {
        console.log(error);
    }
    
})



router.get('/:pid', async (req,res)=>{
    try{
        const{pid} = req.params
        let products = await productManagerMongo.getProductById(pid)
        res.status(200).send({
            status:'success, get id',
            payload: products
         
        })
    }catch (error)  {

        console.log(error);
    }
}) 


router.post('/', async (req,res)=>{
    try {
        const newProduct = req.body
        //console.log(newProduct);
        let result = await productManagerMongo.addProduct(newProduct)


        res.status(200).send({
            status: 'success',
            payload: result
        })
       console.log(result)
    } catch (error) {
        console.log(error)
    }
})

/*router.put('/:uid', async (req, res) => {
    const { pid } = req.params
    const product = req.body
    console.log(pid);
    console.log(product);
    // validar pid 
    // if(!id)   
    // validar campos 
   // if(!product.title || !product.description || product.thumbnail || product.price 
    //|| product.stock || product.status  || product.category  ){ 
    //  return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
    //}
         let  productToReplace = {
              title: product.title,
              description: product.description,
              thumbnail:product.thumbnail,
              price:product.price,
              stock:product.stock,
              code:product.stock,
              status:product.status,
              category:product.category
       }  
       let result = await productManagerMongo.updateProduct({ _id: pid }, productToReplace)
       
       console.log(productToReplace);

    res.send({
        status: 'success',
        payload: result
    })
})*/

router.put('/:pid', async (req,res) =>{
    try {
    const { pid } = req.params
    const product = req.body
 console.log(pid)      
 console.log(product);
       let  productToReplace = {
              title: product.title,
              description: product.description,
              thumbnail:product.thumbnail,
             price:product.price,
              stock:product.stock,
              code:product.stock,
              status:product.status,
              category:product.category
    }  

const result = await productManagerMongo.updateProduct({ _id: pid}, productToReplace)

     console.log(productToReplace);
        
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
    }) 
 


    


router.delete('/:pid', async (req,res)=>{
    try {
        const { pid } = req.params
        const product = req.body

        let result = await productManagerMongo.deleteProduct(pid, product)


        res.status(200).send({
            status: 'success',
            payload: result
        })
       // console.log(result)
    } catch (error) {
        console.log(error)
    }
})
    ///res.status(200).send('Borrar productos')






















/* const pm = new productManager()

 router.get('/', async (req, res) => {
    // http://localhost:8080/products?limit=2
    const { limit } = req.query
    try {
        const valueReturned = await pm.getProducts()
        if (valueReturned.error) return res.status(200).send({ status: 'empty', valueReturned })
        const limitProduts = valueReturned.slice(0, limit)
        res.status(200).send({ status: 'Products', limitProduts })
    }
    catch (err) {
        res.status(400).send({ status: 'error router', err })
    }

}) 







router.get('/:pid', async (req, res) => {
    try {
        // http://localhost:8080/products/2
        console.log(req.params.pid);

        const product = await pm.getProductById(req.params.pid)
        res.status(200).send({product})
    }
    catch (err) {
        console.log(err);
    }

})

// ****************** POST ****************** //

router.post('/', async (req, res) => {
    try {
        // Obtenemos el body
        const productSend = req.body
        //console.log(productSend);

        // Comprobamos que todos los campos estén completos
        const campoVacio = Object.values(productSend).find(value => value === '')
        console.log(campoVacio);
        if (campoVacio) {
            return res.status(400).send({ status: "error", message: " Error Complete all " })
        }
        // desestructuración para enviar al método addProduct
        const {
            title,
            description,
            price,
            status,
            category,
            thumbnails,
            code,
            stock
        } = productSend



        const valueReturned = await pm.addProduct(title, description, price, status,category, thumbnails, code, stock)
        console.log(valueReturned)
        // Si addProduct devuelve un objeto con la propiedad error quiere decir que hay un error
        if (valueReturned.status === 'error') return res.status(400).send({ valueReturned })
        res.status(200).send({ productSend })
    }
    catch (err) {
        console.log(err);
    }

});

// ***************** POST DESDE FORM ****************** //

router.post('/formulario', uploader.single('thumbnail'), async (req, res) => {
    try {
        let productSend = req.body
        // console.log(productSend);
        // console.log(req.file.path, 'img');
        // Comprobamos que todos los campos estén completos
        try {
            productSend.thumbnail = req.file.path
        }
        catch {
            productSend.thumbnail = 'empty'
        }


        // Status true or false
        
        (Object.hasOwn(productSend,'status'))?productSend['status'] = 'true':productSend['status'] = 'false';
            
         
        // console.log(status, 'status later')
        // console.log(productSend, 'later status');


        // desestructuración para enviar al método addProduct
        let {
            title,
            description,
            price,
            status,
            category,
            thumbnails,
            code,
            stock
        } = productSend


        const campoVacio = Object.values(productSend).find(value => value === '')
        if (campoVacio) {
            return res.status(400).send({ status: "error", message: " Error Complete all " })
        }

        // console.log(title, description, price, thumbnail, code, stock)
        const valueReturned = await pm.addProduct(title, description, price, status,category, thumbnails, code, stock)
        // console.log(valueReturned)
        res.send(res.redirect("http://localhost:8080/static"))
    }
    catch (err) {
        console.log(err);
    }

})

// ****************** PUT ****************** //

router.put('/:pid', async (req, res) => {
    try {
        // Datos obtenidos desde el cliente
        const { pid } = req.params
        const productUpdate = req.body

        const updateProduct = await pm.updateProduct(pid, productUpdate)
        if (!updateProduct.error) return res.status(400).send({ updateProduct })
        res.send({ updateProduct })
    }
    catch (err) {
        console.log(err);
    }

});

// ****************** DELETE ****************** //

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const response = await pm.deleteProduct(pid)
        console.log(response)
        if (!response.error) return res.status(400).send({ response })
        res.status(200).send({ response })
    }
    catch (err) {
        console.log(err);
    }

});

 */

export default router
//module.exports = router