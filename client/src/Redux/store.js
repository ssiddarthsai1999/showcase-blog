import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/Slices/userSlice"
import themeReducer from "../Redux/Slices/themeSlice";
// import cartReducer from "../slices/cartSlice";
// import searchReducer from "../slices/searchSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        // cart: cartReducer,
        // search: searchReducer,
    },
});
