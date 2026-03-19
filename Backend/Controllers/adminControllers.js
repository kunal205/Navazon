import Product from "../Model/productsModel.js";
import User from "../Model/userModel.js";
export const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;

        await User.deleteOne({ email });

        res.json({
            status: "success",
            message: "User deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "fail",
            message: `${error}`
        })
    }
}
export const allUser = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json({
            status: "success",
            users: users
        })
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: `${error}`
        })
    }
}
export const updateProfile = async (req, res) => {

    const { _id } = req.params;
    const { name, address, dob, gender, email, role } = req.body;
    const image = req.file?.path;
    console.log("DEBUG updateProfile:", { _id, body: req.body });
    try {
        const user = await User.findById(_id);
        if (!user) {
            console.log("DEBUG user not found for _id:", _id);
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        const updatedData = {};
        if (name) updatedData.name = name;
        if (address) updatedData.address = address;
        if (dob) updatedData.dob = dob;
        if (gender) updatedData.gender = gender;
        if (email) updatedData.email = email;
        if (image) updatedData.image = image;
        if (role) updatedData.role = role;
        const updatedUser = await User.findByIdAndUpdate(_id, updatedData, { new: true });
        return res.status(200).json({
            status: "success",
            message: "User profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: `${error}`
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { title, description, price, tags, minimumOrderQuantity, stock } = req.body
        if (!title || !description || !price || !tags || !minimumOrderQuantity || !stock) {
            return res.status(400).send({
                status: "failed",
                message: "Fill Your Details"
            })
        }
        const product = await Product.insertOne({ title, description, price, tags, image, minimumOrderQuantity, stock })
        return res.status(200).json({
            status: "success",
            message: "Product Added Successfully",
            data: product._id,
        })
    }
    catch {
        return res.status(402).json({
            status: "failed",
            message: `error ${error}`,
        })
    }
}
export const updateProduct = async () => {

}
export const deleteProduct = async () => {

}