
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blogSlices";

export const store=configureStore({
    reducer:blogReducer
})