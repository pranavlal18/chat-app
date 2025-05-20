import express, { Router } from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateprofile } from "../controller/auth.controller.js";
import { checkauth } from "../controller/auth.controller.js";
const router = express.Router()


router.post("/signup",signup)
router.post("/login",login)

router.post("/logout",logout)
router.put("/update-profile",protectRoute,updateprofile)
router.get("/check",protectRoute,checkauth)
export default router