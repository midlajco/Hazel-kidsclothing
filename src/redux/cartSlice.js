import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            const product =action.payload;
             state.items.push({
                productId:product.id,
                name:product.name,
                price:product.price,
                image:product.image,
                quantity:1

               
            }
        )
        
        
        
    },
        removeFromCart:(state,action)=>{
            state.items =state.items.filter((item)=> item.productId!= action.payload)
        }    

    
        
    }
})

export const {addToCart,removeFromCart} =cartSlice.actions

export default cartSlice.reducer;

