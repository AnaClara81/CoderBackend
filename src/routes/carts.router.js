import { Router } from "express";
import CartManager from "../managerDaos/cartsManager.js";

const routerCar = Router();
const carts = new CartManager


routerCar.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const valueReturned = await carts.getCartById(cid)
        if (valueReturned.error) return res.status(200).send({ status: 'No carts found', valueReturned })

        res.status(200).send({ status: 'Carts', valueReturned })
        console.log(valueReturned);
    }
    catch (err) {
        res.status(400).send({ status: 'error router', err })
    }

});

routerCar.post('/', async (req, res) => {
    try {
        // Obtenemos el body
        const cart = req.body
        console.log(cart)
        // Comprobamos que todos los campos estén completos
        const campoVacio = Object.values(cart).find(value => value === '')
        //console.log(campoVacio);
        if (campoVacio) {
            return res.status(400).send({ status: "error", message: " Error Complete all " })
        }

        // Si addProduct devuelve un objeto con la propiedad error quiere decir que hay un error
        if (cart.status === 'error') return res.status(400).send({ valueReturned })
        await carts.addCart(cart)
        res.status(200).send({ cart })
    }
    catch (err) {
        console.log(err);
    }

});

routerCar.post('/:cid/products/:pid', async (req, res) => {
    try {   
        let { producto } = req.body
        const { cid, pid } = req.params
        console.log(cid);
        producto['id'] = Number(pid)

        const carrito = await carts.getCartById(cid)
        if (carrito.error) return res.status(400).send({ carrito })
         console.log(carrito);
        let productoEncontrado = carrito.products.findIndex(productos => productos.id == pid)
         console.log(productoEncontrado, 'found')
         console.log(carrito.products[0]);
        if (productoEncontrado !== -1) {
            // carrito.productos[productoEncontrado]
            carrito.products[productoEncontrado].quantity = Number(carrito.products[productoEncontrado].quantity) + Number(producto.quantity)
            console.log(carrito.products);
            await carts.updateCart(cid, carrito)
            return res.status(200).send({ statusbar: 'success', message: 'added product'});
        }
        console.log(producto);
        carrito.products.push(producto)
        console.log(carrito.products);
        await carts.updateCart(cid, carrito)
        res.status(200).send({status: 'success', message: 'added product', carrito: carrito.products})
    } catch (err) {
        console.log(err);
        return res.status(400).send({ status: "error", message: 'parameter error' })
    }

})

export default routerCar
