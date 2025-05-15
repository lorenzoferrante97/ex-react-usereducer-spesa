// Context per le logiche del content del app

import { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedproducts, setAddedproducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // const addToCart = (product) => {
  //   const isProductAlreadyAdded = addedproducts.find((prod) => prod.name == product.name);
  //   !isProductAlreadyAdded && setAddedproducts((prev) => [...prev, { ...product, quantity: 1 }]);
  // };

  const addToCart = (product) => setAddedproducts((prev) => [...prev, { ...product, quantity: 1 }]);

  const updateProductQuantity = (product) => {
    const existingProductindex = addedproducts.findIndex((prod) => prod.name == product.name);
    // console.log(existingProductindex);
    if (existingProductindex != -1) {
      const addedProductsCopy = structuredClone(addedproducts);
      addedProductsCopy[existingProductindex].quantity++;
      setAddedproducts(addedProductsCopy);
    } else {
      addToCart(product);
    }
  };

  const removeFromCart = (product) => {
    const existingProductindex = addedproducts.findIndex((prod) => prod.name == product.name);
    if (existingProductindex != -1) {
      const addedProductsCopy = structuredClone(addedproducts);
      addedProductsCopy.splice(existingProductindex, 1);
      setAddedproducts(addedProductsCopy);
    }
  };

  const getCartTotal = (cart) => {
    let total = 0;
    cart.forEach((product) => (total += product.quantity * product.price));
    console.log('total: ', total);
    setCartTotal(total.toFixed(2));
  };

  const value = { products, addedproducts, cartTotal, addToCart, updateProductQuantity, removeFromCart, getCartTotal };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
