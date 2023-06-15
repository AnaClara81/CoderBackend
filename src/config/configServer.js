import mongoose from 'mongoose';
import {connect} from 'mongoose';
import orderModel from '../managerDaos/mongo/model/order.model.js';
import ordenes from './ordenes.js';
import dotenv from 'dotenv'
import { JWT_PRIVATE_KEY } from '../utils/jwt.js';
import commander from '../utils/commander.js';
const {mode} =commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});





let url = process.env.MONGO_URL_LOCAL
//const url = 'mongodb://localhost:27017/comision39750'
//const url = 'mongodb+srv://anaceceiza81:UlisesBruno21@cluster0.eiuzcsf.mongodb.net/comision39750?'
/* const configServer= {
     connectDb:() => {
    connect(url)
      console.log('Base de datos conectada');
  }
 }   */
const connectDb = async () => {
    port:process.env.PORT;
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
    try {
       connect(url)
       console.log(`MongoDB Connected Puerto: ${url}`);
 
  
  } catch (err) {
      console.log(err);
      }
  }; 
  
  
  export default connectDb