import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import handcraftedProducts from "../data/handcraftedProducts";
import "./Products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    toast.success("Added to cart");
    dispatch(addCart(product));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setData(handcraftedProducts);
    setFilter(handcraftedProducts);
    setLoading(false);
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const Loading = () => (
    <div className="product-grid">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} height={380} />
      ))}
    </div>
  );

  const ShowProducts = () => (
    <>
      {/* Filters */}
      <div className="product-filters">
        <button onClick={() => setFilter(data)}>All</button>
        <button onClick={() => filterProduct("pottery")}>Pottery</button>
        <button onClick={() => filterProduct("woodcraft")}>Wood Craft</button>
        <button onClick={() => filterProduct("handloom")}>Handloom</button>
        <button onClick={() => filterProduct("jewelry")}>Jewelry</button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filter.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />

            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-footer">
              <span className="price">₹ {product.price}</span>
              <div className="actions">
                <Link to={`/product/${product.id}`}>View</Link>
                <button onClick={() => addProduct(product)}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section className="products-section">
      <h2>Handcrafted Products</h2>
      {loading ? <Loading /> : <ShowProducts />}
    </section>
  );
};

export default Products;
