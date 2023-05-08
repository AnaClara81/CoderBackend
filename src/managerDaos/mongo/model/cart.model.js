import { Schema,model } from 'mongoose'
//import model from 'mongoose'

const collection = 'carts'

const cartSchema = new Schema({
    products: [
        {
            quantity: Number,
            idProduct: String
        }]
 
})

const cartModel = model(collection, cartSchema)

export default cartModel
