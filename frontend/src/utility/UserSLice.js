import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllUsers = createAsyncThunk("getAllUsers", async (thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/users`, { withCredentials: true });
        return res.data.users
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const isCurrentUser = createAsyncThunk("isCurrentUser", async (_, thunkAPI) => {
    try {
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/user/current`, { withCredentials: true })
        return res.data
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const addUser = createAsyncThunk("addUser", async (formdata, thunkAPI) => {
    try {
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        return res.data
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});
export const logInUser = createAsyncThunk("loginUser", async (data, thunkAPI) => {
    try {
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, data, {
            withCredentials: true,
        });
        return res.data
    }
    catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const addToWishlist = createAsyncThunk("addToWishlist", async (productId, thunkAPI) => {
    try {
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/user/wishlist`, { productId }, { withCredentials: true, });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const addToCart = createAsyncThunk("addToCart", async ({ productId, quantity }, thunkAPI) => {
    try {
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/user/addtocart`, { productId, quantity }, { withCredentials: true, });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const updateCartQuantity = createAsyncThunk("updateCartQuantity", async ({ productId, quantity }, thunkAPI) => {
    try {
        let res = await axios.put(`${import.meta.env.VITE_API_URL}/user/updatecart`, { productId, quantity }, { withCredentials: true, });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
const defaultuser = {
    name: "",
    gender: "",
    age: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    wishlist: [],
    Cart: []
}
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userList: [],
        user: defaultuser,
        image: "",
        isloading: false,
        isAuthLoading: true,
        show: false,
        message: null,
        error: null
    },
    reducers: {
        handleshow: (state, action) => {
            state.show = true
        },
        handleclose: (state, action) => {
            state.show = false
        },
        handleuser: (state, action) => {
            state.user = action.payload
        },
        clearErrors: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(isCurrentUser.pending, (state) => {
                state.isAuthLoading = true;
                state.isloading = true;
                state.user = defaultuser;
            })
            .addCase(isCurrentUser.rejected, (state, action) => {
                state.isAuthLoading = true;
                state.isloading = false;
                state.user = defaultuser;
            })
            .addCase(isCurrentUser.fulfilled, (state, action) => {
                state.isAuthLoading = false
                state.isloading = false
                state.user = { ...defaultuser, ...action.payload.user };
                state.message = action.payload.message
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isloading = true;
                state.userList = [];
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isloading = false;
                state.userList = [];
                state.error = action.payload;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isloading = false
                state.userList = action.payload;
            })
            .addCase(addUser.pending, (state, action) => {
                state.isloading = true;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isloading = true;
                state.error = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isloading = false;
                state.user = { ...defaultuser, ...action.payload.user };
                state.message = action.payload.message
            })
            .addCase(logInUser.pending, (state, action) => {
                state.isloading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.isloading = true;
                state.error = action.payload
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.isloading = false;
                state.user = { ...defaultuser, ...action.payload.user };
                state.message = action.payload.message;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.message = action.payload.message
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.message = action.payload.message
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            }).addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});
export const { handleshow, handleclose, handleuser, clearErrors } = userSlice.actions;
export default userSlice.reducer;