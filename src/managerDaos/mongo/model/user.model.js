import mongoose from "mongoose"

import {Schema, model} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'usuarios'

const userSchema = new Schema({

    username: String,

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
    password: String,
    role:{
        type:String,
       enum:['user','admin'],
       dafault:'user'
    }
    //gender:String

})

userSchema.plugin(mongoosePaginate)

const userModel = model(collection,userSchema)

export default userModel