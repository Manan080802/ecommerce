import express from"express"
import { login, logout, signUp } from "../controller/auth.js"
import { validate } from "../middleware/validate.js"
import { loginSchema, signUpSchema } from "../validation/auth.js"

const router = express.Router()

router.route("/sign-up").post(validate(signUpSchema),signUp)
router.route("/log-in").post(validate(loginSchema),login)
router.route("/log-out").get(logout)

export default router