import mongoose from "mongoose";
const prodcutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true, default: "https://placehold.co/600x400?text=No+Image" },
    thumbnail: { type: String, required: true, default: "https://placehold.co/400x400?text=No+Thumbnail" },
    minimumOrderQuantity: { type: Number, required: true },
    stock: { type: Number, required: true },
    id: { type: Number, required: true, unique: true },
    reviews: {
        type: [{
            reviewerName: { type: String, required: true },
            reviewerEmail: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }]
    }
})
const Product = mongoose.model("product", prodcutSchema);
export default Product;