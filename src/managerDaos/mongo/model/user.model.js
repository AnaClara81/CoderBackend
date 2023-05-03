import mongoose from "mongoose"

import { Schema, model }from 'mongoose'

const collection = 'user'
const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:{
        type:String,
        required:true
    },
 email: {
    type:String,
    required:true,
    unique:true
 
    }

})

const userModel = model(collection,userSchema)

export default userModel