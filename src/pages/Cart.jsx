import { removeFromCart } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux'

function Cart() {
    const dispatch =useDispatch()
    const cartItems =useSelector((state)=>state.cart.items);
   
  return (
    <div>
        <h1>Cart</h1>
        {
            cartItems.map((product)=>(
                <div key={product.productId}>
                    <h3>{product.name}</h3>
                    <img src={product.image} alt={product.name}/>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <button onClick={()=>dispatch(removeFromCart(product.productId))} >Remove</button>
                </div>
            ))
        }

    </div>
  )
}

export default Cart

