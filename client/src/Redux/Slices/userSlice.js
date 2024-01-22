import {
    createAsyncThunk,
    createSlice,
    rejectWithValue,
} from "@reduxjs/toolkit";

import * as api from "../api";

//.......................................
export const registerUser = createAsyncThunk(
    "/auth/register",
    async ({ formValues, toast, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.registerUser(formValues);

            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return rejectWithValue(error.response.data);
        }
    }
);
//.......................................
export const loginUser = createAsyncThunk(
    "user/login",
    async ({ formValues, toast, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.loginUser(formValues);

            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            navigate("/");
            window.location.reload();
            return response.data;
        } catch (error) {
            toast.error(error.response.data, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return rejectWithValue(error.response.data);
        }
    }
);
//.......................................

//.......................................
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: "",
    },
    //.......................................
    reducers: {
        setLogout: (state, action) => {
            state.user = null;
            localStorage.clear();
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    //.......................................
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            state.loading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;

            // localStorage.setItem(
            //     "profile",
            //     JSON.stringify({ ...action.payload })
            // );
            state.user = action.payload;
            //     localStorage.clear()
            // window.reload()
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //--------------------------------------------------------------
        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;

            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action.payload })
            );
            state.user = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //--------------------------------------------------------------
    },
});
export default userSlice.reducer;
export const { setLogout, setUser } = userSlice.actions;
