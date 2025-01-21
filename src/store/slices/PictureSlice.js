import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    firstPhoto: null,
    secondPhoto: null,
}



export const PhotosSclice = createSlice({
    name: 'PhotosSlice',
    initialState: initialState,
    reducers : {

        setFirstImage : (state, actions) => {
            state.firstPhoto = actions.payload
        }, 
        
        setSecondImage : (state, actions) => {
            state.secondPhoto = actions.payload
        }, 
    }
})

export const {setFirstImage, setSecondImage} = PhotosSclice.actions

export default PhotosSclice.reducer

