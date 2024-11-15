import express from"express"
import { logout, signUp } from "../controller/auth.js"
import { validate } from "../middleware/validate.js"
import { signUpSchema } from "../validation/auth.js"

const router = express.Router()

router.route("/sign-up").post(validate(signUpSchema),signUp)

router.route("/log-out").get(logout)

export default router