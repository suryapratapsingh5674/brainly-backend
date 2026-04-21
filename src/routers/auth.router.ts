import express from "express";
import { loginUser, logoutUser, registerUser, signedIn } from "../controller/auth.controller.ts";
import isuserSigned from "../middlewares/isSignedIn.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get('/getme', isuserSigned, signedIn)

export default router;
