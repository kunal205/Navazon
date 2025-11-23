import Product from "../Model/productsModel.js"

export const allproduct = async (req, res) => {
    try {
        const product = await Product.find().sort({ id: 1 })
        res.status(200).json({
            status: "success",
            products: product
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

export const singleProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ id: Number(id) })
        res.status(200).json({
            status: "success",
            products: product
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
export const addReview = async (req, res) => {
    const { id, comment, rating, reviewerName, reviewerEmail } = req.body
    try {
        const product = await Product.findOne({ id: Number(id) })
        if (!product) {
            return res.status(404).json({
                status: "failed",
                message: "Product not found"
            });
        }
        const newReview = {
            reviewerName: reviewerName,
            reviewerEmail: reviewerEmail,
            rating: Number(rating),
            comment: comment,
            date: new Date() // Mongoose will default this, but good to be explicit
        };
        product.reviews.push(newReview);
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / product.reviews.length;
        product.rating = Number(averageRating.toFixed(1));
        await product.save();
        res.status(200).json({
            status: "success",
            products: product
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
export const addProduct = async (res, req) => {

}