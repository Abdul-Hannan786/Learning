import React from "react";

const ProductCard = ({ item }) => {
  const { price, thumbnail, title, category } = item;

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md">
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={thumbnail}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
         {title}
        </h2>
        <p className="mt-1">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
