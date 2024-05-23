"use client"

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './db/firebaseConfig';
import Galery from './Components/Galery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Components/Header";

// Déclaration de l'objet ProductsTypes comme un objet JavaScript
const ProductsTypes = {
  id: "",
  name: "",
  desc: "",
  country: "",
  image: "",
  price: 0,
  quantityPack: 0,
  strength: 0,
  quantityProduct: 0,
};

export default function Home() {
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsData = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setDataProducts(productsData);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <Galery dataProducts={dataProducts} />
    </>
  );
}
