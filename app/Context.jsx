'use client'

import { createContext, useEffect, useState } from "react";

export const Context = createContext({
  // Provide default values for context properties
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  setMobileMenuOpen: () => {},
  setMobileMenuClose: () => {},
  isUserMenuOpen: false,
  toggleUserMenu: () => {},
  setUserMenuOpen: () => {},
  setUserMenuClose: () => {},
  isCartMenuOpen: false,
  toggleCartMenu: () => {},
  setCartMenuOpen: () => {},
  setCartMenuClose: () => {},
  
  cartItems: [],
  handleAddToCart: (item) => {},
  handleDecreaseCount: (item) => {},
  handleDeleteCartItem: (itemId) => {},
  getTotalItemCount: () => 0,
  getTotalPrice: () => 0,
  emptyCart: () => {},

  isEditable: false,
  setEditable: () => {},

  openPopup: false,
  setOpenPopup: () => {},

  deletableSubId: {},
  setDeletableSubId: () => {}
});

export default function ContextProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(true);
  const [cartItems, setIsCartItems] = useState([]);
  const [isEditable, setEditable] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [deletableSubId, setDeletableSubId] = useState()

  useEffect(() => {
    const storedCart = typeof window !== 'undefined' ? localStorage.getItem('emlekqrkosar') : null;
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('emlekqrkosar', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('emlekqrkosar');
    }
  }, [cartItems]);

  /*Mobile menu*/ 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const setMobileMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };
  
  const setMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  /*User menu*/ 

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  const setUserMenuOpen = () => {
    setIsUserMenuOpen(true);
  };
  
  const setUserMenuClose = () => {
    setIsUserMenuOpen(false);
  };

  /*Cart menu*/ 

  const toggleCartMenu = () => {
    setIsCartMenuOpen((prevState) => !prevState);
  };

  const setCartMenuOpen = () => {
    setIsCartMenuOpen(true);
  };
  
  const setCartMenuClose = () => {
    setIsCartMenuOpen(false);
  };

  /*Cart menu*/

  const setCartPopup = () => {
    setIsCartPopup(true);
  
    setTimeout(() => {
      setIsCartPopup(false);
    }, 450);
  }
        

  /*Manage cart items*/ 

  function handleAddToCart(newItem) {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex((item) => item._id === newItem._id);
  
      if (itemIndex !== -1) {
        // If the item already exists, update its count and notes
        return prevCartItems.map((item, index) =>
          index === itemIndex ? { ...item, count: item.count + 1 } : item
        );
      } else {
        // If the item is new, add it to the cart with count and notes
        return [...prevCartItems, { ...newItem, count: 1 }];
      }
    });
  }

  function handleDecreaseCount({ _id, count }) {
    const itemIndex = cartItems.findIndex((item) => item._id === _id);

    if (itemIndex !== -1 && cartItems[itemIndex].count > 1) {
      setCartItems((prevItems) =>
        prevItems.map((item, index) =>
          index === itemIndex ? { ...item, count: item.count - 1 } : item
        )
      );
    } else if (itemIndex !== -1 && cartItems[itemIndex].count === 1) {
      const updatedCart = cartItems.filter((item) => item._id !== _id);
      setCartItems(updatedCart);
    }
  }

  function handleDeleteCartItem(itemId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  }

  function getTotalItemCount() {
    return cartItems.reduce((total, item) => total + item.count, 0);
  }


  function getTotalPrice() {
    return cartItems.reduce((accumulator, currentItem) => {
      const itemPrice = currentItem.tipus === 0 ? currentItem.elsodlegesar : currentItem.masodlagosar;
      return accumulator + itemPrice * currentItem.count;
    }, 0);
  }

  function emptyCart() {
    setCartItems([]);
  }

  const togglePopup = () => {
    setOpenPopup(prevState => !prevState)
  }
  

  return (
    <Context.Provider value={{
      isMobileMenuOpen: !isMobileMenuOpen,
      toggleMobileMenu,
      setMobileMenuOpen,
      setMobileMenuClose,
      isUserMenuOpen: !isUserMenuOpen,
      toggleUserMenu,
      setUserMenuOpen,
      setUserMenuClose,
      isCartMenuOpen: !isCartMenuOpen,
      toggleCartMenu,
      setCartMenuOpen,
      setCartMenuClose,

      cartItems, 
      handleAddToCart,
      handleDecreaseCount, 
      handleDeleteCartItem,
      getTotalItemCount,
      getTotalPrice,
      emptyCart,

      isEditable,
      setEditable,

      openPopup,
      togglePopup,
      setOpenPopup,

      deletableSubId,
      setDeletableSubId

    }}>
      {children}
    </Context.Provider>
  );
}
