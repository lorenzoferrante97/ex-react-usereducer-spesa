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

  const addToCart = (product) => {
    const isProductAlreadyAdded = addedproducts.find((prod) => prod.name == product.name);
    !isProductAlreadyAdded && setAddedproducts((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const value = { products, addedproducts, addToCart };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
