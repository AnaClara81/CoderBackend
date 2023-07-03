import config from '../config/configServer.js'
import ProductDaoMongo from './mongo/product.mongo.js';
import UserDaoMongo from './mongo/user.mongo.js';
import ContactDaoMongo from './mongo/contact.mongo.js';
import ProductDaoFile from '../dao/file/product.file.js';
import UserDaoFile from '../dao/file/user.file.js';
import ProductDaoMemory from '../dao/memory/product.memory.js';
import UserDaoMemory from '../dao/memory/users.memory.js';
import ContactDaoFile from '../dao/file/contact.file.js';
import ContactsDaoMemory from '../dao/memory/contacts.memory.js';


let UserDao
let ProductDao
let ContactDao

switch (config.persistence) {
    case 'MONGO':
      config.connectDB();
      UserDao = UserDaoMongo;
      ProductDao = ProductDaoMongo;
      ContactDao = ContactDaoMongo;
      break;
    case 'FILE':
      UserDao = UserDaoFile;
      ProductDao = ProductDaoFile;
      ContactDao = ContactDaoFile;
      break;
    case 'MEMORY':
      UserDao = UserDaoMemory;
      ProductDao = ProductDaoMemory;
      ContactDao = ContactsDaoMemory;
      break;
    default:
      break;
  }
  
  export { UserDao,ProductDao,ContactDao } 