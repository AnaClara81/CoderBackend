import mongoose from 'mongoose';
import {connect} from 'mongoose';
const url = 'mongodb://localhost:27017/comision39750'
//const url = 'mongodb+srv://anaceceiza81:UlisesBruno21@cluster0.eiuzcsf.mongodb.net/comision39750?'
/* const configServer= {
     connectDb:() => {
    connect(url)
      console.log('Base de datos conectada');
  }
 }   */
const connectDb = async () => {
    try {
      await mongoose.connect(url, {
    
      });
      console.log('MongoDB Connected');
    } catch (err) {
      console.log(err);
      }
  }; 
  
  
  export default connectDb;