import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/allproduct`, { withCredentials: true });
        return (res.data.products);
    } catch (error) {
        console.log(error.message)
    }
})

export const getSingleProducts = createAsyncThunk("getSingleProducts", async (id) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/singleproduct/${id}`, { withCredentials: true });
        return (res.data.products);
    } catch (error) {
        console.log(error.message)
    }
})
export const addReview = createAsyncThunk("addReview", async ({ id, comment, rating, reviewerName, reviewerEmail }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/products/singleproduct/${id}`, { id, comment, rating, reviewerName, reviewerEmail }, { withCredentials: true });
        return (res.data.products);
    } catch (error) {
        console.log(error.message)
    }
})
const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState: {
        productList: [],
        isLoading: false,
        product: {
            title: "",
            rating: "",
            price: "",
            description: "",
            image: "",
            reviews: [],
            message: null,
            error: null
        }
    },
    reducers: {
        handleshow: (state, action) => {
            state.show = true
        },
        handleclose: (state, action) => {
            state.show = false
        },
        handleproducts: (state, action) => {
            state.user = action.payload
        },
        addReviews: (state, action) => {
            if (Array.isArray(state.product.reviews)) {
                state.product.reviews.push(action.payload);
            }
            else { state.product.reviews = [action.payload]; }
        },
        clearErrors: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
            state.productList = []
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = true
            state.productList = []
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload
            // console.log(state.productList)
        })
            .addCase(getSingleProducts.pending, (state) => {
                state.isLoading = true
                state.product = {}
            }).addCase(getSingleProducts.rejected, (state, action) => {
                state.isLoading = true
                state.product = {}
            }).addCase(getSingleProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.product = action.payload
                // console.log(state.productList)
            }).addCase(addReview.rejected, (state, action) => {
                state.isLoading = false
                state.product.message = null
                state.product.error = action.error.message
            }).addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.product.message = "Review added successfully"
                state.product.error = null
            })
    }
})
export const { handleclose, handleproducts, handleshow, addReviews } = ProductSlice.actions
export default ProductSlice.reducer 