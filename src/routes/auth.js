import express from"express"
import { signUp } from "../controller/auth.js"
import { validate } from "../middleware/validate.js"
import { signUpSchema } from "../validation/auth.js"

const router = express.Router()

router.route("/sign-up").post(validate(signUpSchema),signUp)

export default router