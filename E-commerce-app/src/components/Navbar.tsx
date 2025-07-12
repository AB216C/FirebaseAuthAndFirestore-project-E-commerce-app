import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import "../App.css"

export default function Navbar() {
  const [user] = useAuthState(auth);

  if (!user) return null; //Navbar will only shows up after logging in

  return (
    <nav className="navbar-main">
      <div className="navbar">
        <Link to="/" className="home">Home</Link>
        <Link to="/cart" className="cart">Cart</Link>
        <Link to="/orders" className="order">Orders</Link>
        <Link to="/admin" className="adminpage">AdminPage</Link>
      </div>
      <button
        onClick={() => auth.signOut()}
        className="logout-button"
      >
        Logout
      </button>
    </nav>
  );
}


