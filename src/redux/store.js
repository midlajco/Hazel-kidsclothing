import { configureStore } from "@reduxjs/toolkit";
import auhtReducer from "./authSlice"
const store =configureStore({
    reducer:{
        authentication :auhtReducer,
    }
})

export default store;