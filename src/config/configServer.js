import mongoose from 'mongoose';
import connect from 'mongoose';
 
/* export default  {
     connectDb:() => {
    connect('mongodb://localhost:27017/comision39750')
      console.log('Base de datos conectada');
  }
 }  */
 let url ='mongodb+srv://anaceceiza81:UlisesBruno21@cluster0.eiuzcsf.mongodb.net/comision39750?retryWrites=true&w=majority'
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