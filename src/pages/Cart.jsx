import { removeFromCart, increaseQ, decreaseQ,clearCart} from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux'

function Cart() {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items);
    const total=cartItems.reduce((sum,product)=>sum+product.price*product.quantity,0);
    
    

    return (
        <div>
            <h1>Cart</h1>
            {
                cartItems.map((product) => (
                    <div key={product.productId}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} />
                        <p>{product.price * product.quantity}</p>
                        <p>{product.description}</p>

                        <button onClick={() => dispatch(increaseQ(product.productId))} >+</button>

                        <p>{product.quantity}</p>
                        {
                            product.quantity >1 && (
                                <button onClick={()=>dispatch(decreaseQ(product.productId))} >-</button>
                                
                            )  }
                        
                        <button onClick={() => dispatch(removeFromCart(product.productId))} >Remove</button>
                    </div>
                ))
            }
            <p>{total}</p>
            <button onClick={()=>dispatch(clearCart())} >Empty Cart</button>
            

        </div>
    )
}

export default Cart

