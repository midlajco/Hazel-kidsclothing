import { BrowserRouter,Routes,Route } from "react-router-dom"

import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"


import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { login } from "./redux/authSlice"
import ProductPage from "./pages/ProductPage"
import CheckOut from "./pages/CheckOut"
import { getUserById } from "./services/userService"

function App() {


  const dispatch =useDispatch();
  

  useEffect(() => {
  const restoreUser = async () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        const user = await getUserById(JSON.parse(userId));
        dispatch(login(user));
      } catch (error) {
        console.error("Failed to restore user:", error);
        localStorage.removeItem("userId");
      }
    }
  };

  restoreUser();
}, [dispatch]);

  return (
    <BrowserRouter>
     <Routes>
      <Route  path="/" element ={<Home/>}  />
      <Route  path="/register" element ={<Register/>}  />
      <Route  path="/login" element ={<Login/>}  />
      <Route  path="/shop" element ={<Shop/>}  />
      <Route  path="/cart" element ={<Cart/>}  />
      <Route  path="/checkout" element ={<CheckOut/>}  />
      <Route  path="/orders" element ={<Orders/>}  />

      
      <Route  path="/product/:id" element ={<ProductPage/>}  />
      
     </Routes>
    </BrowserRouter>
  )
}

export default App