import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../App.css';

export default function Home() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all categories of available product
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const allCategories = snapshot.docs.map(doc => doc.data().category);
      return [...new Set(allCategories)];
    },
  });

  // Fetch products (With option to filter by category)
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: async () => {
      const productsRef = collection(db, 'products');
      const q = selectedCategory
        ? query(productsRef, where('category', '==', selectedCategory))
        : productsRef;

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="home">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>

      <select
        className="mb-4 p-2 border"
        onChange={e => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {categories?.map((cat: string) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mx-auto mb-2"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <p className="text-sm">{product.description.slice(0, 100)}...</p>
            <p>Rating: {product.rating?.rate ?? 'N/A'} ⭐</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="addtocart"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}