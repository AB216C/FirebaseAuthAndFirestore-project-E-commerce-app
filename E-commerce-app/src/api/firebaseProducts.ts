
// import axios from 'axios';

// const products_URL = 'https://fakestoreapi.com/';

// export const fetchProducts =async(category?:string)=>{
//   const endpoint = category? `/products/category/${category}`:'/products'
//   const {data} = await axios.get(`${products_URL}${endpoint}`);
//   return data;
// };

// export const fetchCategories = async()=>{
//   const {data} = await axios.get(`${products_URL}/products/categories`);
//   return data;
// }



import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const productsRef = collection(db, "products");

export const fetchProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createProduct = async (product) => await addDoc(productsRef, product);

export const updateProduct = async (id, updatedData) =>
  await updateDoc(doc(db, "products", id), updatedData);

export const deleteProduct = async (id) =>
  await deleteDoc(doc(db, "products", id));
