import { addToCart, deliveredOrder, isCurrentUser, updateCart, updatedUser, wishlist } from "../Controllers/userController.js"
import express from 'express'
import isAuth from "../Middleware/isAuth.js"
export const userRouter = express.Router()
import upload from "../Middleware/multer.js"
userRouter.get("/current", isAuth, isCurrentUser)
userRouter.post("/wishlist", isAuth, wishlist)
userRouter.post("/addtocart", isAuth, addToCart)
userRouter.put("/updatecart", isAuth, updateCart)
userRouter.put("/updateprofile", isAuth, upload.single("image"), updatedUser)
userRouter.put("/deliveredorder", isAuth, deliveredOrder)