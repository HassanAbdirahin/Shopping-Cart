import React from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar: React.FC = () => {
  const { cartQuantity, openCart } = useShoppingCart();
  return (
    <nav className="flex items-center justify-between px-6 py-4 mb-4 bg-white shadow-md">
      <div className=" flex items-center justify-between gap-10 text-lg">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About</Link>
      </div>
      {cartQuantity > 0 && (
        <div className="space-x-4">
          <button
            className="text-blue-500 border-2 rounded-full p-3 border-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={openCart}
          >
            <FaCartShopping size={20} />
            <div className="absolute right-4 top-11 bg-red-500 text-white rounded-full w-6">
              {cartQuantity}
            </div>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
