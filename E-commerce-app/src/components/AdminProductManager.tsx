import { useEffect, useState } from 'react';
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/firebaseProducts';

export default function AdminProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const productData = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      rating: { rate: 0 },
    };

    if (editId) {
      await updateProduct(editId, productData);
    } else {
      await createProduct(productData);
    }

    setForm({ title: '', price: '', category: '', description: '', image: '', stock: '' });
    setEditId(null);
    loadProducts();
  };

  const handleEdit = (product: any) => {
    setForm({
      title: product.title,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      stock: product.stock.toString(),
    });
    setEditId(product.id);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="admin p-4">
      <h2 className="text-xl font-bold mb-4">Admin Product Manager</h2>

      <div className="mb-4 space-y-2">
        <input className="border p-2 w-full" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input className="border p-2 w-full" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input className="border p-2 w-full" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <textarea className="border p-2 w-full" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input className="border p-2 w-full" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input className="border p-2 w-full" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
          {editId ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <hr className="my-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto mb-2" />
            <h3 className="font-semibold">{product.title}</h3>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.category}</p>
            <button className="bg-yellow-400 text-white px-3 py-1 mr-2 rounded" onClick={() => handleEdit(product)}>Edit</button>
            <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}