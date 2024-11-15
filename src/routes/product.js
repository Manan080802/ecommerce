import express from"express"
import { validate } from "../middleware/validate.js"
import { authentication } from "../middleware/authentication.js"
import { addProduct } from "../controller/product.js"
import { productSchema } from "../validation/product.js"
const router = express.Router()

router.route("/add").post(authentication,validate(productSchema),addProduct)

export default router