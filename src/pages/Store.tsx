import React from "react";
import StoreItems from "../data/items.json";
import StoreItem from "../components/StoreItem";

const Store: React.FC = () => {
  return (
    <div className="m-4">
      <h1 className="text-3xl mb-3 font-semibold">Store</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
        {StoreItems.map((item) => {
          return (
            <div key={item.id}>
              <StoreItem {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;
