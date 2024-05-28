"use client";

import React, { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = products.findIndex((p) => p.id === product.id);
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update its quantity
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantityProduct += 1;
      setProducts(updatedProducts);
    } else {
      // Product does not exist in the cart, add it
      setProducts([...products, { ...product, quantityProduct: 1 }]);
    }
  };

  const decrementQuantity = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        // If quantity is greater than 1, decrement it
        if (product.quantityProduct > 1) {
          return { ...product, quantityProduct: product.quantityProduct - 1 };
        } else {
          // Otherwise, remove it completely from the cart
          return null;
        }
      }
      return product;
    }).filter(product => product !== null); // Filter out null products
    setProducts(updatedProducts);
  };

  const incrementQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantityProduct: product.quantityProduct + 1 } : product
      )
    );
  };

  const removeFromCart = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <ProductsContext.Provider value={{ products, addToCart, decrementQuantity, incrementQuantity, removeFromCart }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('Erreur');
  }
  return context;
};
