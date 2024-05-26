"use client"

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../app/db/firebaseConfig';
import Galery from './Components/Galery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Components/Header";
import ProductsTypes from './Components/ProductsType';
import Footer from './Components/Footer';

export default function Home() {
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productsCollection = collection(db, 'products');
    try {
      const productsSnapshot = await getDocs(productsCollection);
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDataProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Header />
      <Galery dataProducts={dataProducts} />
      <Footer />
    </>
  );
}
