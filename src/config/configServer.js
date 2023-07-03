import mongoose from 'mongoose';
import {connect} from 'mongoose';

import dotenv from 'dotenv'
import { JWT_PRIVATE_KEY } from '../utils/jwt.js';
import commander from '../utils/commander.js';

import MongoSingleton from '../utils/singleton.js';


const {mode} =commander.opts()
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});


const connectDb = () => {
    const url = process.env.MONGO_URL_LOCAL || 'mongodb://localhost:27017/comision39750';
    const persistence = process.env.PERSISTENCE;
    const port = process.env.PORT;
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

    MongoSingleton.getInstance();

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Base de datos conectada');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });
};


//let url = process.env.MONGO_URL_LOCAL
//const url = 'mongodb://localhost:27017/comision39750'
//const url = 'mongodb+srv://anaceceiza81:UlisesBruno21@cluster0.eiuzcsf.mongodb.net/comision39750?'
/* const configServer= {
     connectDb:() => {
    connect(url)
      console.log('Base de datos conectada');
  }
 }   */
/* const connectDb = () => {
    persistence:process.env.PERSISTENCE;
    port:process.env.PORT;
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY

    MongoSingleton.getInstance()
   /* try {
       connect(url)
       console.log(`MongoDB Connected Puerto: ${url}`);
 
  
  } catch (err) {
      console.log(err);
      } 
  }; 
   
   */
  export default connectDb