import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";

interface Order {
  id:string;
  total:number;
  createdAt: {seconds:number} | Date| null;
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser?.uid)
      );
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map(order => {
        const orderDate = order.createdAt
          ? 'seconds' in order.createdAt
            ? new Date(order.createdAt.seconds * 1000)
            : order.createdAt instanceof Date
            ? order.createdAt
            : null
          : null;

        return (
          <div key={order.id} className="mb-4 p-2 border rounded">
            <p>Order #{order.id}</p>
            <p>Total: ${order.total?.toFixed(2)}</p>
            <p>Date: {orderDate ? orderDate.toLocaleDateString() : 'Unknown'}</p>
          </div>
        );
      })}
    </div>
  );
};