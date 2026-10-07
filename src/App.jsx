import { BrowserRouter,Routes,Route } from "react-router-dom"

import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"

import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { login } from "./redux/authSlice"
import ProductPage from "./pages/ProductPage"

function App() {


  const dispatch =useDispatch();
  

  useEffect(()=>{
    const storedUser =localStorage.getItem("user");

    if(storedUser){
      const user =JSON.parse(storedUser);
      dispatch(login(user))
    }
  },[dispatch])

  return (
    <BrowserRouter>
     <Routes>
      <Route  path="/" element ={<Home/>}  />
      <Route  path="/register" element ={<Register/>}  />
      <Route  path="/login" element ={<Login/>}  />
      <Route  path="/shop" element ={<Shop/>}  />
      <Route  path="/cart" element ={<Cart/>}  />
      <Route  path="/product/:id" element ={<ProductPage/>}  />
      
     </Routes>
    </BrowserRouter>
  )
}

export default App