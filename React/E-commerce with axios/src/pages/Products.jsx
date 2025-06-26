import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryTab from "../components/CategoryTab";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenCategory, setChosenCategory] = useState("All");

  useEffect(() => {
    fetchAllProducts();
  }, [chosenCategory]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const url =
        chosenCategory === "All"
          ? "https://dummyjson.com/products"
          : `https://dummyjson.com/products/category/${chosenCategory}`;
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto font-mono">
      {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <div>
          <section className="flex flex-wrap gap-3 my-5 font-semibold ">
            <CategoryTab
              category={{
                slug: "All",
                name: "All",
              }}
              isChosen={chosenCategory === "All"}
              onClick={() => {
                    setChosenCategory("All");
                  }}
            />
            {categories.map((category) => {
              return (
                <CategoryTab
                  isChosen={chosenCategory === category.slug}
                  category={category}
                  key={category.slug}
                  onClick={() => {
                    setChosenCategory(category.slug);
                  }}
                />
              );
            })}
          </section>
          <section className="text-gray-600 body-font py-8">
            <div className="flex flex-wrap -m-4">
              {products.map((item) => {
                return <ProductCard key={item.id} item={item} />;
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Products;
