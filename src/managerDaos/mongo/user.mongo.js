import userModel from "./model/user.model.js";

class UserManagerMongo {
    
    async getUsers(){
        try{
            return await userModel.find({first_name:'Celia'}).explain('executionsStats')
            
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