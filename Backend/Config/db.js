import mongoose from "mongoose"
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected");
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Server error", error: error.message
        });
    }
}
export default dbConnect;