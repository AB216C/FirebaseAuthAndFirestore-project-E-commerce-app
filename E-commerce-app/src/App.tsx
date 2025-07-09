import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import AdminProductManager from './components/AdminProductManager';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import './App.css';

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-6">
          <div className="space-x-4">
            <Link to="/" className="text-blue-600 font-bold">Home</Link>
            <Link to="/cart" className="text-blue-600 font-bold">Cart</Link>
            <Link to="/admin" className="text-blue-600 font-bold">Admin</Link>
          </div>
          <div>
            {user ? (
              <button
                onClick={() => auth.signOut()}
                className="text-red-600 border px-3 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-green-600">Login</Link>
            )}
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={user ? <AdminProductManager /> : <p>Please login to access admin.</p>} />
        </Routes>
      </div>
    </Router>
  );
}
