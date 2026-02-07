import React from "react";
import { Navbar, Footer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));

  const EmptyCart = () => (
    <div className="cart-empty">
      <h2>Your cart is empty</h2>
      <Link to="/" className="btn-outline">
        ← Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;
    const shipping = 30;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {state.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="item-details">
                <h4>{item.title}</h4>
                <p>₹ {item.price}</p>
              </div>

              <div className="item-qty">
                <button onClick={() => removeItem(item)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => addItem(item)}>+</button>
              </div>

              <div className="item-total">
                ₹ {item.price * item.qty}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Products ({totalItems})</span>
            <span>₹ {Math.round(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₹ {shipping}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹ {Math.round(subtotal + shipping)}</span>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section className="cart-section">
        <h1>Shopping Cart</h1>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </section>
      <Footer />
    </>
  );
};

export default Cart;
