import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        })
        console.log("✅ Database Connected Successfully");
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
    }
}

export default dbConnect;