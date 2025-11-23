import express from "express";
import Product from "../Model/productsModel.js";
import { allproduct, singleProduct, addReview, addProduct } from "../Controllers/productController.js";
// import { signUpController, signInController, signOutController } from "../Controllers/authControllers.js";
// import upload from "../Middleware/multer.js"
const productsRouter = express.Router();
// console.log(Product)
productsRouter.get("/allproduct", allproduct)
productsRouter.get("/singleproduct/:id", singleProduct)
productsRouter.post("/addProduct", addProduct)
productsRouter.post("/singleproduct/:id", addReview)
export default productsRouter