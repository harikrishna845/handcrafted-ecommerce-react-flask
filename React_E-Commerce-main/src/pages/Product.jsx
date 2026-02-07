import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Marquee from "react-fast-marquee";

import handcraftedProducts from "../data/handcraftedProducts";
import { Navbar, Footer } from "../components";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const selectedProduct = handcraftedProducts.find(
      (item) => item.id === Number(id)
    );

    setProduct(selectedProduct);

    if (selectedProduct) {
      const related = handcraftedProducts.filter(
        (item) =>
          item.category === selectedProduct.category &&
          item.id !== selectedProduct.id
      );
      setSimilarProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", padding: "50px" }}>
          Product not found
        </p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="product-section">
        <div className="product-layout">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-details">
            <span className="category">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="price">₹ {product.price}</p>
            <p className="description">{product.description}</p>

            <div className="product-actions">
              <button onClick={() => dispatch(addCart(product))}>
                Add to Cart
              </button>
              <Link to="/cart">Go to Cart</Link>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <>
            <h2 className="similar-title">You may also like</h2>

            <Marquee pauseOnHover speed={50}>
              {similarProducts.map((item) => (
                <div key={item.id} className="similar-card">
                  <img src={item.image} alt={item.title} />
                  <h5>{item.title}</h5>
                  <Link to={`/product/${item.id}`}>View</Link>
                </div>
              ))}
            </Marquee>
          </>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Product;
