import productModel from './model/product.model.js'


class ProductManagerMongo {
   
    async getProducts(){
        try{
            return await productModel.find().lean()
        }catch(err){
            return new Error(err)
        }
    }

    async getProductById(pid){
        try{
        
            return await productModel.findOne({ _id: pid})
        }catch(error){
            return new Error (error)
        }
        
    }
    
    
    async addProduct(newProduct){
       try{
            return await productModel.create(newProduct)
       } 
         catch(error){
        return new Error (error)
       }
    
}
    async updateProduct({ _id: pid }, productToReplace ){
        
     try{
            return await productModel.updateOne({ _id: pid }, productToReplace )
            //updateOne({_id: pid}, productToReplace )
            
        }catch(error){
            return new Error (error)
           }
    } 

    
   async deleteProduct(pid){
        try{
            return await productModel.deleteOne({_id: pid})
        }catch(error){
            return new Error (error)
           }
    }
} 

export default  new ProductManagerMongo;