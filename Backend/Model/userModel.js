import validator from "validator"
import { secureHeapUsed } from "crypto"
import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    // dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, validate: [validator.isEmail, "Please Enter The Valid Email"] },
    image: { type: String },
    password: { type: String, required: true },
    address: { type: String, required: true },
    wishlist: { type: Array, default: [] },
    Cart: [{
        productId: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 }
    }]
})
const User = mongoose.model("user", userSchema)
export default User;