import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import type { CartItem } from '../features/cart/types';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../App.css';

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart) as CartItem[];
  const dispatch = useDispatch();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleCheckout = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert('You must be logged in to place an order.');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart,
        total: totalPrice,
        createdAt: serverTimestamp(),
      });

      dispatch(clearCart());
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="cart">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. You're welcome to add items!</p>
      ) : (
        <>
          <ul className="product">
            {cart.map(item => (
              <li key={item.id} className="cart-item flex items-center mb-4">
                <img src={item.image} alt={item.title} className="h-12 w-12 object-contain mr-4" />
                <div className="flex-1">
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-lg">Total Items: {totalItems}</p>
          <p className="mb-4 text-lg">Total Price: ${totalPrice.toFixed(2)}</p>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

