import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface Product {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}
const productsRef = collection(db, "products");

export const fetchAllProducts = async (): Promise<(Product & { id: string })[]> => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Product) }));
};
export const createProduct = async (product: Product): Promise<void> => {
  await addDoc(productsRef, product);
};
export const updateProduct = async (id: string, updatedData: Partial<Product>): Promise<void> => {
  await updateDoc(doc(db, "products", id), updatedData);
};
export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "products", id));
};
