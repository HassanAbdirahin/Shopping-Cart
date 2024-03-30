import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItem from "../data/items.json";
import Store from "../pages/Store";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const cartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = StoreItem.find((item) => item.id === id);
  if (!item) {
    return null;
  }
  const { name, price, imgUrl } = item;
  return (
    <div className="flex justify-between items-center mx-4 gap-10">
      <img
        className="w-36 h-20 rounded-md object-cover"
        src={imgUrl}
        alt={name}
      />

      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-xl">
            {name} <span className="text-xs text-gray-400">{quantity}x</span>
          </h1>
          <h2 className="text-gray-400">{formatCurrency(price)}</h2>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-xl">{formatCurrency(quantity * price)}</h1>
          <button
            className="border-2 border-gray-400 rounded w-6 h-6 flex items-center justify-center text-xs font-semibold hover:bg-red-500 hover:text-white"
            onClick={() => removeFromCart(id)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default cartItem;
