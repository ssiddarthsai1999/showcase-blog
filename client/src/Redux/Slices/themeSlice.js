// src/Redux/Slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: "light", // default theme
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
