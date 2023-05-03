import mongoose from 'mongoose';
import connect from 'mongoose';
 
/* export default  {
     connectDb:() => {
    connect('mongodb://localhost:27017/comision39750')
      console.log('Base de datos conectada');
  }
 }  */

const connectDb = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/comision39750', {
    
      });
      console.log('MongoDB Connected');
    } catch (err) {
      console.log(err);
      }
  };
  
  
  export default connectDb;