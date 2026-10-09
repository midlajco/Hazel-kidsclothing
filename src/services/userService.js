import axios from "axios";

const users ="http://localhost:3000/users";
const products ="http://localhost:3000/products";
const orders ="http://localhost:3000/orders";

export async function createUser(user){
    const response = await axios.post(`${users}`,user);
    return response.data
}
export async function getUserByEmail(email){
    const response =await axios.get(`${users}?email=${email}`)
    return response.data[0]
}
