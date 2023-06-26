//traer instacia de los daos
import UserDaoMongo from "../managerDaos/mongo/user.mongo.js"
import ProductDaoMongo from "../managerDaos/mongo/product.mongo.js"
const userService = new UserDaoMongo()
const productService = new ProductDaoMongo()

export  {productService,userService}