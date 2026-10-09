import axios from "axios";

const URL = "http://localhost:3000/cart";

export const getCartByUser = async (userId) => {
  const response = await axios.get(`${URL}?userId=${userId}`);
  
  return response.data[0];
};

export const createCart = async (userId) => {
    const response = await axios.post(URL, {
        userId: userId,
        items: []
    });

    return response.data;
};

 export const updatedCart =async(id,d)=>{
    const response =await axios.patch(`${URL}/${id}`,{
        items:d
         
    })
    return response.data

  }

  

 

