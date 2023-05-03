
import { Schema,model }from 'mongoose'
//import model from 'mongoose'

const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: Boolean,
    
    category:String,
    
    code: {
        type: String,
        unique: true,
        required: true
    }
})

const productModel = model(collection, productSchema)

export default productModel
