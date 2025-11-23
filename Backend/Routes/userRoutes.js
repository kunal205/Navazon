import { addToCart, allUser, isCurrentUser, updateCart, wishlist } from "../Controllers/userController.js"
import express from 'express'
import isAuth from "../Middleware/isAuth.js"
export const userRouter = express.Router()
userRouter.get("/current", isAuth, isCurrentUser)
userRouter.get("/users", allUser)
userRouter.post("/wishlist", isAuth, wishlist)
userRouter.post("/addtocart", isAuth, addToCart)
userRouter.put("/updatecart", isAuth, updateCart)