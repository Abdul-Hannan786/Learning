import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const { price, thumbnail, title, category, id } = item;

  return (
    <Link to={`/products/${id}`} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md">
      <div>
        <div className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={thumbnail}
          />
        </div>
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
    </Link>
  );
};

export default ProductCard;
