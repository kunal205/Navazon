import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected");
    } catch (error) {

    }
}
export default dbConnect;