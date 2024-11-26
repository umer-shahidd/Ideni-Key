import { configureStore } from "@reduxjs/toolkit";
import  Imageslices  from "./slices/imageSlice";


export default configureStore({
    reducer: {
        second: Imageslices
    }
})