import { addProduct, allUser, deleteProduct, deleteUser, updateProduct, updateProfile } from "../Controllers/adminControllers.js";
import express from 'express'
import isAuth from "../Middleware/isAuth.js"
import User from "../Model/userModel.js"
import upload from "../Middleware/multer.js";

export const adminRouter = express.Router()
adminRouter.use(isAuth)
adminRouter.use(async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
})
adminRouter.get("/users", allUser)
adminRouter.delete("/delete", deleteUser)
adminRouter.put("/update-user/:_id", upload.single("image"), updateProfile)
adminRouter.post("/add-product", addProduct)
adminRouter.put("/update-product", updateProduct)
adminRouter.delete("/delete-product", deleteProduct)
