import Product from "../Model/productsModel.js"
import User from "../Model/userModel.js"
export const isCurrentUser = async (req, res) => {
    try {
        const id = req.userId
        const user = await User.findById(id).select("-password")
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "User Not Found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "User Authenticate successfully",
            user: user
        })
    } catch (error) {
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
export const wishlist = async (req, res) => {
    const { userId } = req;
    const { productId } = req.body;
    const productIdInNum = Number(productId);
    let message = "";
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const index = user.wishlist.indexOf(productIdInNum);
        if (index > -1) {
            user.wishlist.pull(productIdInNum),
                message = "Product removed from wishlist"

        } else {
            user.wishlist.push(productIdInNum),
                message = "Product added to wishlist";
        }
        await user.save();
        res.status(200).json({
            status: "success",
            message: "Wishlist updated",
            user: user
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: `${error.message}`
        });
    }
};
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const { userId } = req;
    const productIdInNum = Number(productId);
    const quantityToAdd = Number(quantity) || 1;
    try {
        console.log(productId)
        const user = await User.findById(userId);
        const product = await Product.findOne({ id: productIdInNum })
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        if (!product) {
            return res.status(404).json({ status: "failed", message: "Product not found" });
        }
        const maxLimit = Number(product.minimumOrderQuantity)

        const existingProductIndex = user.Cart.findIndex(
            item => item.productId === productIdInNum
        );
        if (existingProductIndex > -1) {
            const currentQty = user.Cart[existingProductIndex].quantity;
            const newTotalQty = currentQty + quantityToAdd;
            if (newTotalQty > maxLimit) {
                return res.status(400).json({
                    status: "failed",
                    message: `Cannot add more. Max limit is ${maxLimit}, you have ${currentQty} in cart.`
                });
            }
            user.Cart[existingProductIndex].quantity = newTotalQty;
        }
        else {
            if (quantityToAdd > maxLimit) {
                return res.status(400).json({
                    status: "failed",
                    message: `Cannot add ${quantityToAdd}. Max limit is ${maxLimit}.`
                });
            }
            if (quantityToAdd > maxLimit) {
                return res.status(400).json({
                    status: "failed",
                    message: `Cannot add ${quantityToAdd}. Max limit is ${maxLimit}.`
                });
            }
            user.Cart.push({
                productId: productIdInNum,
                quantity: quantityToAdd
            });
        }
        await user.save();
        res.status(200).json({
            status: "success",
            message: "Cart updated successfully",
            user: user
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Server error", error: error.message
        });
    }
};
export const updateCart = async (req, res) => {
    const { userId } = req;
    const { productId, quantity } = req.body;
    const productIdInNum = Number(productId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        const itemIndex = user.Cart.findIndex(
            (item) => item.productId === productIdInNum
        )
        if (itemIndex === -1) {
            return res.status(404).json({
                status: "failed",
                message: "Product not found in cart"
            });
        }
        if (quantity < 1) {
            user.Cart.splice(itemIndex, 1);
        }
        else {
            user.Cart[itemIndex].quantity = Number(quantity);
        }

        await user.save();
        res.status(200).json({
            status: "success",
            message: quantity < 1 ? "Item removed from cart" : "Cart updated",
            user: user
        });
    } catch (error) {

    }
}