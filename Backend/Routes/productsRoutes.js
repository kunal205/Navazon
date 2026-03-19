import express from "express";
import { allproduct, singleProduct, addReview } from "../Controllers/productController.js";
const productsRouter = express.Router();
productsRouter.get("/allproduct", allproduct)
productsRouter.get("/singleproduct/:id", singleProduct)
productsRouter.post("/singleproduct/:id", addReview)
export default productsRouter