import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllUsers = createAsyncThunk("getAllUsers", async (thunkAPI) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, { withCredentials: true });
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
export const updateUser = createAsyncThunk("updateUser", async (formData, thunkAPI) => {
    try {
        let res = await axios.put(`${import.meta.env.VITE_API_URL}/user/updateprofile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});
export const signOut = createAsyncThunk("signOut", async (_, thunkAPI) => {
    try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/signout`, {
            withCredentials: true
        });
    } catch (error) {
        console.log("1")
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});
export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (email, thunkAPI) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_API_URL}/admin/delete`,
                { withCredentials: true }
            );
            return email; // return deleted user email
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
export const deliveredOrder = createAsyncThunk("deliveredOrder", async ({ items, orderId, status, deliveredDate, bill }, thunkAPI) => {
    try {
        let res = await axios.put(`${import.meta.env.VITE_API_URL}/user/deliveredorder`, { items, orderId, status, deliveredDate, bill }, { withCredentials: true, });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
})
export const updateProfile = createAsyncThunk("updateProfile", async ({ _id, formData }, thunkAPI) => {
    try {
        let res = await axios.put(`${import.meta.env.VITE_API_URL}/admin/update-user/${_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});
const defaultuser = {
    name: "",
    role: "",
    gender: "",
    age: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    wishlist: [],
    Cart: [],
    order: []
}
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userList: [],
        user: defaultuser,
        image: "",
        imageFile: null,
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
            })
            .addCase(updateUser.pending, (state) => {
                state.isloading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isloading = false;
                // Merge the updated user data returned from backend
                state.user = { ...state.user, ...action.payload.user };
                state.message = action.payload.message || "Profile updated successfully";
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isloading = false;
                state.error = action.payload;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = defaultuser;
                state.message = "Signed out successfully";
            })
            .addCase(signOut.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.userList = state.userList.filter(
                    (u) => u.email !== action.payload
                );
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isloading = true;
            })
            .addCase(deliveredOrder.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.message = action.payload.message
            })
            .addCase(deliveredOrder.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.message = action.payload.message
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.payload;
            })
    },
});
export const { handleshow, handleclose, handleuser, clearErrors } = userSlice.actions;
export default userSlice.reducer;