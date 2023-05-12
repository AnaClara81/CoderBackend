import mongoose from "mongoose"

import {Schema, model} from 'mongoose'

const collection = 'usuarios'

const userSchema = new Schema({
    first_name:String,
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

const userModel = model(collection,userSchema)

export default userModel