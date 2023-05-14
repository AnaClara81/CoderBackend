import mongoose from 'mongoose';
import {connect} from 'mongoose';
import orderModel from '../managerDaos/mongo/model/order.model.js';
import ordenes from './ordenes.js';



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
       connect(url)
       console.log('MongoDB Connected');
    ////insertar ordenes
    //await orderModel.insertMany(ordenes)

    //solicitar ordenes
    //let result  = await orderModel.find()
    //console.log(result);
      
   //ejemplos de stages-1
/*   const resultOrders =await orderModel.aggregate([
    {
      //paso1
      $match:{size:'medium'}
    },
    {
      //paso2
      $group:{_id:'$name', totalquantity: {$sum:"$quantity"}}
    }
  ])
   console.log( resultOrders);
 */
    //ejemplos de stages-2
    const resultOrders =await orderModel.aggregate([
      {
        //paso1
        $match:{size:'medium'}
      },
      {
        //paso2
        $group:{_id:'$name', totalquantity: {$sum:"$quantity"}}// con este reporte dos resultados
      },
      //ordena
      {
        $sort: {totalquantity: -1}//manera descendente, lo acomodamos
      },
      {
        $group: {_id:1, orders: {$push: '$$ROOT'}}// insertar/agrupar en un solo objeto
      },
      {
        $project:{   //creamos el objeto en el campo orders
          "_id:": 1,
          orders:'$orders',
        }
      },
        {
          $merge:{
            into:'reportes'// que lo inserte a la colleccion en la bd
          }
        }
      
    ])
     console.log( resultOrders);
  
  } catch (err) {
      console.log(err);
      }
  }; 
  
  
  export default connectDb;