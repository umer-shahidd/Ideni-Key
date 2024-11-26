import { createSlice } from "@reduxjs/toolkit";


export const Imageslices = createSlice({
name: 'imageSlice',
initialState: {
    second: false
},

reducers: {
    setSecondImagetrue : state => {
        state.second = true
    },
    setSecondImageFalse : state => {
        state.second = false
    }
}
})

export const {setSecondImageFalse, setSecondImagetrue} = Imageslices.actions

export default Imageslices.reducer