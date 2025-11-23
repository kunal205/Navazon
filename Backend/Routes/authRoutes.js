import express from "express";
import { signUpController, signInController, signOutController } from "../Controllers/authControllers.js";
import upload from "../Middleware/multer.js"
const authRouter = express.Router();
authRouter.post("/signup", upload.single("image"), signUpController)
authRouter.post("/signin", signInController)
authRouter.get("/signout", signOutController)
export default authRouter