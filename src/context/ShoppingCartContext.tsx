import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContextProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    const itemIndex = cartItems.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      // If item exists, increment its quantity
      const newCartItems = cartItems.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(newCartItems);
    } else {
      // If item doesn't exist, add it with quantity 1
      const newItem = { id: id, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  }

  function decreaseCartQuantity(id: number) {
    const newCartItems = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(newCartItems);
  }

  function removeFromCart(id: number) {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  }

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cartItems={cartItems}
      />
    </ShoppingCartContext.Provider>
  );
}
