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
  const [quantityInput, setQuantityInput] = useState(1);
  const [isQuantityWrong, setIsQuantityWrong] = useState(false);

  // const addToCart = (product) => {
  //   const isProductAlreadyAdded = addedproducts.find((prod) => prod.name == product.name);
  //   !isProductAlreadyAdded && setAddedproducts((prev) => [...prev, { ...product, quantity: 1 }]);
  // };

  const addToCart = (product, qt) => setAddedproducts((prev) => [...prev, { ...product, quantity: qt }]);

  const updateProductQuantity = (product, qt) => {
    if (quantityInput <= 0) {
      setIsQuantityWrong(true);
      return;
    }

    const existingProductindex = addedproducts.findIndex((prod) => prod.name == product.name);
    // console.log(existingProductindex);
    if (existingProductindex != -1) {
      const addedProductsCopy = structuredClone(addedproducts);
      addedProductsCopy[existingProductindex].quantity = qt;
      setAddedproducts(addedProductsCopy);
    } else {
      addToCart(product, qt);
    }

    setIsQuantityWrong(false);
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
    // console.log('total: ', total);
    setCartTotal(total.toFixed(2));
  };

  const handleInput = (e) => setQuantityInput(parseInt(e.target.value));

  const value = { products, addedproducts, cartTotal, addToCart, updateProductQuantity, removeFromCart, getCartTotal, quantityInput, handleInput, isQuantityWrong };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
