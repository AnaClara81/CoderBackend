 import userModel from "./model/user.model.js";
import mongoosePaginate from 'mongoose-paginate-v2'

class UserDaoMongo {
    constructor(){
        this.userModel = userModel
    }
    async get(){
        try{
       //return await userModel.find({})//({first_name:'Celia'}).explain('executionsStats')
       //return await userModel.find({first_name:'Celia'}).lean()//convierto en objeto javascript para acceder a los campos
       //mongoose- paginate
       //const { docs } = users
      return await userModel.find({})
      //paginate({},{limit:10, page:1, lean:true})
       
        }catch(err){
            return new Error(err)
        }
    }
    async getById(uid){
        return await this.userModel.finOne({_id :uid})
    }

    create =async (newUser)=>{
       return await this.userModel.create(newUser)
      
    }
    
    async update(uid, userUpdate){
        return await this.userModel.findOneAndUpdate({_id: uid}, {userUpdate})


    }
    async delete(uid){
        return await this.userModel.findOneAndDelete({_id :uid})
    }
}

export default UserDaoMongo; 