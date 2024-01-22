import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/Slices/userSlice"
// import cartReducer from "../slices/cartSlice";
// import searchReducer from "../slices/searchSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        // cart: cartReducer,
        // search: searchReducer,
    },
});
