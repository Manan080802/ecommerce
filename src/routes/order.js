import express from 'express'
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'
import { placeOrder } from '../controller/order.js'
const router = express.Router()

router.route("/place").post(authentication,authorization,placeOrder )

export default router