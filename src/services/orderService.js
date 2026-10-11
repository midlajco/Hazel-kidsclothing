import axios from "axios";

const URL ="http://localhost:3000/orders";

export const createOrder =async (order)=>{
    const response = await axios.post(URL,order);
    return response.data
}
export const getOrederByUser=async(id)=>{
    const response=await axios.get(`${URL}?userId=${id}`);
    return response.data
}