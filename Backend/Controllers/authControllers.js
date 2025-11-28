import tokenGenerator from "../Config/token.js";
import User from "../Model/userModel.js"
import bcrypt from "bcrypt";
export const signUpController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, age, gender, address } = req.body
        if (!name || !gender || !age || !email || !password || !confirmPassword || !address) {
            return res.status(400).send({
                status: "failed",
                message: "Fill Your Details"
            })
        }
        else {
            const userExist = await User.findOne({ email })
            if (userExist) {
                return res.status(400).send({
                    status: "failed",
                    message: "User Already Exist"
                })
            }
            const checkPassword = password === confirmPassword
            if (!checkPassword) {
                return res.status(400).send({
                    status: "failed",
                    message: "Password and Confirm Password does not match"
                })
            }
            console.log("first ")
            const hasspassword = await bcrypt.hash(password, 4)
            const user = await User.insertOne({ name, gender, age, email, password: hasspassword, address, image: req.file.path })
            const token = tokenGenerator(user._id)
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                status: "success",
                message: "User Registered Successfully",
                data: user._id,
            })
        }
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            message: `error ${error}`,
        })
    }
};
export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Enter your E-mail and Password"
            })
        }
        else {
            const ifUserExist = await User.findOne({ email })
            if (!ifUserExist) {
                return res.status(400).json({
                    status: "failed",
                    message: "User Not Found, Please Sign Up"
                })
            }
            const checkPassword = await bcrypt.compare(password, ifUserExist.password)
            if (!checkPassword) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid E-mail ID or Password"
                })
            }
            const token = tokenGenerator(ifUserExist._id)
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                status: "success",
                message: "User Signed In Successfully",
                data: ifUserExist._id,

            })
        }
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: `error ${error}`,
        })
    }
};
export const signOutController = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        status: "success",
        message: "Signed Out Successfully"
    })
};
