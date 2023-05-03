import productModel from './model/product.model'


class ProductManagerMongo {
   
    async getProducts(){
        try{
            return await productModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async getProductsById(pid){}
    async addProduct(){}
    async updateProduct(){pid}
    async deleteProduct(){pid}
}

export default  new ProductManagerMongo;