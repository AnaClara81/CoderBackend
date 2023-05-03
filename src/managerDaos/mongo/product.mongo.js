import productModel from './model/product.model.js'


class ProductManagerMongo {
   
    async getProducts(){
        try{
            return await productModel.find({})
        }catch(err){
            return new Error(err)
        }
    }

    async getProductsById(pid){
        try{
        
            return await productModel.finOne({_id: pid})
        }catch(error){
            return new Error (error)
        }
        
    }
    
    
    async addProduct(newProduct){
       try{

        return await productModel.create(newProduct)
    }catch(error){
        return new Error (error)
    }
    
}
    async updateProduct(){pid}
    async deleteProduct(){pid}
}

export default  new ProductManagerMongo;