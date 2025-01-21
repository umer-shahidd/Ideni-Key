import { configureStore } from "@reduxjs/toolkit";
import  Imageslices  from "./slices/imageSlice";
import  PhotosSclice  from "./slices/PictureSlice";


export default configureStore({
    reducer: {
        second: Imageslices,
        photos : PhotosSclice,

    }
})