import fs from 'fs';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = './managerDaos/carts.json';
    }

    addCart = async (newCart) => {
        try {

            const carts = await this.getCarts();
            // console.log(carts);
            this.carts = carts


            //ID autoincremental
            if (this.carts.length === 0) {
                newCart.id = 1
            } else {
                newCart.id = this.carts[this.carts.length - 1].id + 1
            }

            if (Object.values(newCart).every(value => value)) {
                this.carts.push(newCart);
                const toJSON = JSON.stringify(this.carts, null, 2);
                await fs.promises.writeFile(this.path, toJSON)
            }

            return [];
        }
        catch (err) {
            console.log(err);
        }

    }

    getCarts = async () => {
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
            if (getFileCarts.length === 0) return [];
            return JSON.parse(getFileCarts)
        } catch (err) {
            console.log(err);
            return { status: "error", error: err }
        }
    };

    getCartById = async (id) => {
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parseCarts = JSON.parse(getFileCarts);
            // console.log(parseCarts[id - 1]);
            if (!parseCarts[id - 1]) return { error: 'Error! The cart does not exist' }

            return parseCarts[id - 1]
        }
        catch (err) {
            console.log(err);
        }
    }

    updateCart = async (pid, data) => {
        try {
            const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
            const parseCarts = JSON.parse(getFileCarts);
            // console.log(parseProducts);
            if (isNaN(Number(pid))) return { status: "error", message: 'Invalid id' };

            const findId = parseCarts.findIndex(product => product.id == pid)
            if (findId === -1) return { status: "error", message: 'id not found' };

            this.carts = parseCarts.map(element => {
                if(element.id == cid){
                    element = Object.assign(element, data);
                   return element
                }
                return element
            })
            

            const toJSON = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(this.path, toJSON)
            return returnedTarget
        }
        catch (err) {
            console.log(err);
        }

    }
}

// const carritos = new CartManager()

// const test = async () => {
// const carrito = {
//     productos: [
//         {
//             idProduct: 4,
//             cantidad: 10
//         },
//         {
//             idProduct: 2,
//             cantidad: 11
//         }

//     ]
// }
// await carritos.addCart(carrito)
// }
// test()

export default CartManager