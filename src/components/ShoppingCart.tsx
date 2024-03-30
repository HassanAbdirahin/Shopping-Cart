import React, { FC } from "react";
import CartItem from "./cartItem"; // Assuming the correct path to CartItem component
import { formatCurrency } from "../utilities/formatCurrency";
import StoreItems from "../data/items.json"; // Importing directly from the JSON file

type ShoppingCartProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartItems: any[];
};

const ShoppingCart: FC<ShoppingCartProps> = ({
  isOpen,
  setIsOpen,
  cartItems,
}) => {
  return (
    <div
      className={`shopping-cart md:w-[35%] ${
        isOpen ? "translate-x-[0]" : "translate-x-[-400%]"
      }`}
    >
      <div className="flex my-4 items-center justify-between">
        <h1 className="text-xl">Shopping Cart</h1>
        <button
          className="text-xl font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          x
        </button>
      </div>
      <div className="flex flex-col justify-between items-start gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id} id={item.id} quantity={item.quantity} />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <h1 className="text-2xl font-bold absolute right-3 mx-2 my-10">
          Total:
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = StoreItems.find((item) => item.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </h1>
      )}
    </div>
  );
};

export default ShoppingCart;
