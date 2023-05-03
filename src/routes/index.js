import { Router } from 'express'
const router = Router()
// import { viewsRouter } from './views.router'

import productRouter from './products.router.js'
// router.use('/', viewsRouter)
// router.use('/register', viewsRouter)
// app.use('/chat', viewsRouter)
// //router de productos


// //router de carrito
// //router.use('/api/carts', routerCar)

// router.use('/',(req,res)=>{
//     res.send('Hola mundo')
// })
router.use('/api/products', productRouter)
export default router