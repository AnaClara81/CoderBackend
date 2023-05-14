import userModel from "./model/user.model.js";
import mongoosePaginate from 'mongoose-paginate-v2'

class UserManagerMongo {
    
    async getUsers(){
        try{
            //return await userModel.find({})//({first_name:'Celia'}).explain('executionsStats')
           //return await userModel.find({first_name:'Celia'}).lean()//convierto en objeto javascript para acceder a los campos
       //mongoose- paginate
       //const { docs } = users
      return await userModel.paginate({},{limit:10, page:1, lean:true})
       
        }catch(err){
            return new Error(err)
        }
    }
    async getUserById(){}
    async addUser(){}
    async updateUser(){}
    async deleteUser(){}
}

export default UserManagerMongo;