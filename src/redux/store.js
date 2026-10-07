import { configureStore } from "@reduxjs/toolkit";
import auhtReducer from "./authSlice"
import cartReducer from "./cartSlice"


const store =configureStore({
    reducer:{
        authentication :auhtReducer,
        cart:cartReducer
    }
})

export default store;