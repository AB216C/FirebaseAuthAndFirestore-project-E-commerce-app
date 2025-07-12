import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import AdminProductManager from './components/AdminProductManager';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import './App.css';
import { OrderHistory } from './components/OrderHistory';

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
       
      {user && <Navbar />}

      <Routes>
      
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminProductManager />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
         
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </div>
  );
}
