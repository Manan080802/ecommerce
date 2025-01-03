import express from "express"
import { authentication } from "../middleware/authentication.js"
import { validate } from "../middleware/validate.js"
import { authorization } from "../middleware/authorization.js"
import { addToCart, checkOut } from "../controller/cart.js"
import { addToCartSchema } from "../validation/cart.js"

const router = express.Router()

router.route("/add").post(authentication,authorization,validate(addToCartSchema),addToCart)

router.route("/check-out").post(authentication,authorization,checkOut)


export default router