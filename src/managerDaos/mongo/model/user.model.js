import mongoose from "mongoose"

import {Schema, model} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'usuarios'

const userSchema = new Schema({
    first_name: String,
    last_name:{
        type:String,
        index: true
    },
    email: {
        type:String,
        required:true,
        unique:true
 
    },
    gender:String

})

userSchema.plugin(mongoosePaginate)

const userModel = model(collection,userSchema)

export default userModel