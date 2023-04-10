import fs from 'fs'
//const fs = require('fs')
const path = './productManager.js'
 class productManager{
    constructor(){
        this.products =[]
            this.path = '../src/managerDaos/productos.json'
        
    }
    __appendProduct = async () => {

        const toJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, toJSON)
    };

    addProduct = async (title, description, price, status, category, thumbnail, code, stock) => {
        const productsFS = await this.getProducts();
        // console.log(productsFS);
        this.products = productsFS
        
        let product = {
            title,
            description,
            price,
            status,
            category,
            thumbnail,
            code,
            stock
        }
        // console.log(product, 'codigo----');
        // Validacion de codigo 
        const validarCodigo = this.products.find(productos => productos.code === product.code)
        if (validarCodigo) {
            return { status: "error", message: 'El producto no se pudo agregar porque el codigo es repetido' }
        }
        // ID Autoincremental
        if (this.products.length === 0) {
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }
        //console.log(product,"antes del if");
        // Verifica que el objeto tenga todos sus valores
        if (Object.values(product).every(value => value)) {
            (product.status === 'false')? product.status = false : product.status = true;
            console.log(product.price, 'precio');
            product.price = Number(product.price)
            product.stock = Number(product.stock)
            product.thumbnail = [product.thumbnail]
            this.products.push(product);
            this.__appendProduct()
            return { status: "succes", message: 'El producto se registró', producto: product };

        }
        return { status: "error", message: 'Todos los campos son obligatorios' };

    }

    getProducts = async () => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            if (getFileProducts.length === 0) return [];
            return JSON.parse(getFileProducts)
        } catch (err) {
            console.log(err);
            return { status: "error", error: err }
        }

    }

    getProductById = async (id) => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const parseProducts = JSON.parse(getFileProducts);
            console.log(parseProducts[id - 1]);
            if (!parseProducts[id - 1]) return 'Error! No existe'

            return parseProducts[id - 1]
        }
        catch (err) {
            console.log(err);
        }
    }



    updateProduct = async (pid, data) => {
        const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
        const parseProducts = JSON.parse(getFileProducts);
        // console.log(parseProducts);
        if (isNaN(Number(pid))) return { status: "error", message: 'No es un id válido' };

        const findId = parseProducts.findIndex(product => product.id == pid)
        if (findId === -1) return { status: "error", message: 'No se encontró el id' };

        const returnedTarget = Object.assign(parseProducts[pid - 1], data);

        parseProducts[pid - 1] = returnedTarget;

        this.products = parseProducts
        this.__appendProduct()
        return returnedTarget

    }

    deleteProduct = async (pid) => {
        const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
        const parseProducts = JSON.parse(getFileProducts);
        if (isNaN(Number(pid))) return { status: "error", message: 'No es un id válido' };

        const findId = parseProducts.findIndex(product => product.id == pid)
        if (findId === -1) return { status: "error", message: 'No se encontró el id' };

        const filtro = parseProducts.filter(product => product.id !== pid)
        // console.log(parseProducts);
        this.products = filtro;
        this.__appendProduct();
        return { status: "success", message: `se eliminó el producto con id ${pid}` }
    }
};

const instancia = new productManager();
// const test = async () => {
//await instancia.addProduct('Producto 1','Este es el producto 1',200,"Sin imagen","A123",25)
//await instancia.addProduct('Producto 2','Este es el producto 2',300,"Sin imagen","B456",35)
//await instancia.addProduct('Producto 3','Este es el producto 3',550,"Sin imagen","C789",45)
//await instancia.addProduct('Producto 4','Este es el producto 4',650,"Sin imagen","C790",75)
//await instancia.addProduct('Producto 5','Este es el producto 5',520,"Sin imagen","C389",25)
//await instancia.addProduct('Producto 6','Este es el producto 6',560,"Sin imagen","C719",65)
//await instancia.addProduct('Producto 7','Este es el producto 7',500,"Sin imagen","C109",10)
//await instancia.addProduct('Producto 8','Este es el producto 8',580,"Sin imagen","C789",45)
//await instancia.addProduct('Producto 9','Este es el producto 9',559,"Sin imagen","C989",35)
//await instancia.addProduct('Producto 10','Este es el producto 10',520,"Sin imagen","C782",25)
// };
// const test = async () => {
//     // await instancia.deleteProduct(5)
//     const ver = await instancia.getProducts()
//     // const filtro = ver
//     // console.log(filtro);
//     console.log(ver)
// }
// test();
// // console.log(instancia.products);

// console.log(instancia.getProductById(4))
// // instancia.getProductById(2);
// // instancia.getProductById(4);
// // instancia.updateProduct(1, {
// //     "title": "AOE2",
// //     "description": "Juego de estrategia",
// //     "price": 500,
// //     "thumbnail": "imagen",
// //     "code": 123465,
// //     "stock": 15,
// //   })
// // instancia.deleteProduct(3)

export default productManager;
//module.export = productManager
