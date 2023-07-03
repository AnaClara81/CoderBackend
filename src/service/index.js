import {UserDao, ProductDao, ContactDao} from '../dao/factory.js';

import  ContactRepository  from '../repositories/contacts.repositories.js'

const productService =  new ProductDao
const userService = new UserDao
const contactService = new ContactRepository(ContactDao()) 



export default {productService,userService,contactService}





//traer instacia de los daos
/* import UserDaoMongo from "../managerDaos/mongo/user.mongo.js"
import ProductDaoMongo from "../managerDaos/mongo/product.mongo.js"
import ProductDaoMemory from "../managerDaos/memory/product.memory.js"

const userService = new UserDaoMongo()
const productService = new ProductDaoMongo()
//const productService = new ProductDaoMemory()



export  {productService,userService} */
