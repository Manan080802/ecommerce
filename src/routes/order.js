import express from 'express'
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'
import { getAllOrder, placeOrder } from '../controller/order.js'
const router = express.Router()

router.route("/place").post(authentication,authorization,placeOrder )
router.route("/all").get(authentication,authorization,getAllOrder)

export default router