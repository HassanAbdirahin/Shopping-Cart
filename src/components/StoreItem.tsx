import React, { FC } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import {
  ShoppingCartContextProvider,
  useShoppingCart,
} from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <>
      <div className="bg-white rounded-b-xl ">
        <img
          className="h-[300px] object-cover w-full"
          src={imgUrl}
          alt={name}
        />
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-500 text-lg">{formatCurrency(price)}</p>
        </div>
        <div className=" mt-auto flex items-center justify-center p-4">
          {quantity > 0 ? (
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-10">
                <button
                  className="bg-blue-500 text-white text-3xl pb-2 font-semibold w-12 h-12 rounded-md"
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </button>
                <h3 className="text-xl">
                  <span className="text-2xl">{quantity}</span> in cart
                </h3>
                <button
                  className="bg-blue-500 text-white text-3xl pb-2 font-semibold w-12 h-12 rounded-md"
                  onClick={() => increaseCartQuantity(id)}
                >
                  +
                </button>
              </div>
              <button
                className=" w-[80%] mx-auto rounded-md bg-red-600 text-white py-3 font-semibold mt-4"
                onClick={() => removeFromCart(id)}
              >
                Remove from Cart
              </button>
            </div>
          ) : (
            <button
              className=" w-[80%] rounded-md  bg-blue-500 text-white py-3 font-semibold"
              onClick={() => increaseCartQuantity(id)}
            >
              + Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default StoreItem;
