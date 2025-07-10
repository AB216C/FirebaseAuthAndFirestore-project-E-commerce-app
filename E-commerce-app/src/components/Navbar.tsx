import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [user] = useAuthState(auth);

  if (!user) return null; // Don't show navbar if not logged in

  return (
    <nav className="flex justify-between items-center mb-6">
      <div className="space-x-4">
        <Link to="/" className="text-blue-600 font-bold">Home</Link>
        <Link to="/cart" className="text-blue-600 font-bold">Cart</Link>
        <Link to="/orders" className="text-blue-600 font-bold">Orders</Link>
        <Link to="/admin" className="text-blue-600 font-bold">Admin</Link>
      </div>
      <button
        onClick={() => auth.signOut()}
        className="text-red-600 border px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}


