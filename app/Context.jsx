'use client'

import { createContext, useState } from "react";

export const Context = createContext({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  setMobileMenuOpen: () => {},
  setMobileMenuClose: () => {},
  
  isUserMenuOpen: false,
  toggleUserMenu: () => {},
  setUserMenuOpen: () => {},
  setUserMenuClose: () => {},

  form: 'login',
  setForm: () => {},

  isEditable: false,
  setEditable: () => {},

  openPopup: null, // Set null as default for popup state
  togglePopup: () => {},
  setOpenPopup: () => {},

  deletableSubId: null,
  setDeletableSubId: () => {}
});

export default function ContextProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [openPopup, setOpenPopup] = useState(null); // Default to null
  const [deletableSubId, setDeletableSubId] = useState(null);
  const [form, setForm] = useState('')

  /* Mobile menu */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const setMobileMenuOpen = () => setIsMobileMenuOpen(true);
  const setMobileMenuClose = () => setIsMobileMenuOpen(false);

  /* User menu */
  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  const setUserMenuOpen = () => setIsUserMenuOpen(true);
  const setUserMenuClose = () => setIsUserMenuOpen(false);

  /* Modal */
  const togglePopup = (popupName) => {
    setOpenPopup((prevPopup) => (prevPopup === popupName ? null : popupName));
  };

  return (
    <Context.Provider value={{
      isMobileMenuOpen,
      toggleMobileMenu,
      setMobileMenuOpen,
      setMobileMenuClose,
      
      isUserMenuOpen,
      toggleUserMenu,
      setUserMenuOpen,
      setUserMenuClose,

      isEditable,
      setEditable,

      openPopup,
      togglePopup,
      setOpenPopup,

      deletableSubId,
      setDeletableSubId,

      form,
      setForm
    }}>
      {children}
    </Context.Provider>
  );
}
