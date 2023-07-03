import productModel from './model/product.model.js'
import mongoosePaginate from 'mongoose-paginate-v2'

class ProductDaoMongo {
    constructor(){
        this.productModel = productModel
    }
   
    async get(){
        try{
            const products = await this.productModel.find().lean()
            return products
          
        }catch(err){
            return new Error(err)
        }
    }

    async getById(pid){
        try{
           return await this.productModel.findOne({ _id: pid})

        }catch(error){
            return new Error (error)
        }
        
    }
    
    
    async create(newProduct){
       try{
            return await this.productModel.create(newProduct)
       } 
         catch(error){
        return new Error (error)
       }
    
}
    async update(pid, productToReplace ){
        
     try{
            return await this.productModel.updateOne({ _id: pid },productToReplace)
            
        }catch(error){
            return new Error (error)
           }
    } 

    
   async delete(pid){
        try{
            return await this.productModel.deleteOne({_id: pid})
        }catch(error){
            return new Error (error)
           }
    }


    /* async getOrderProduct(){
          try{
         // return await productModel.aggregate([
            console.log("order")
            return await productModel.paginate({},{limit:5, page})
            
         
         // ])


          }catch(error){
            return new Error (error)
           }

    } 
 */
}

export default ProductDaoMongo;