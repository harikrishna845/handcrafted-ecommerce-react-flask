import React, { useRef } from "react";
import { Navbar, Footer } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const cart = useSelector((state) => state.handleCart);

  // Refs for address fields (uncontrolled inputs – stable)
  const nameRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const pincodeRef = useRef();

  const EmptyCart = () => (
    <div className="checkout-empty">
      <h2>No items in cart</h2>
      <Link to="/" className="btn-outline">
        ← Continue Shopping
      </Link>
    </div>
  );

  const placeOrder = async () => {
    // 🔐 AUTH CHECK (IMPORTANT)
    if (!localStorage.getItem("userEmail")) {
      alert("Please login or register to place an order");
      window.location.href = "/login";
      return;
    }

    // Read input values
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const street = streetRef.current.value;
    const city = cityRef.current.value;
    const stateVal = stateRef.current.value;
    const pincode = pincodeRef.current.value;

    // Validation
    if (!name || !phone || !street || !city || !stateVal || !pincode) {
      alert("Please fill all address fields");
      return;
    }

    // Combine address into ONE column
    const address = `
Name: ${name}
Phone: ${phone}
Street: ${street}
City: ${city}
State: ${stateVal}
Pincode: ${pincode}
    `.trim();

    // Prepare items
    const items = cart.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.qty,
      image: item.image,
    }));

    // Calculate total
    const totalPrice =
      cart.reduce((sum, item) => sum + item.price * item.qty, 0) + 30;

    // Send order to backend
    const res = await fetch("http://127.0.0.1:5000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: localStorage.getItem("userEmail"),
        items,
        address,
        total_price: totalPrice,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order placed successfully (Cash on Delivery)");
    } else {
      alert("Order failed");
    }
  };

  const ShowCheckout = () => (
    <div className="checkout-layout">
      <div className="checkout-form">
        <h3>Shipping Address</h3>

        <input ref={nameRef} placeholder="Full Name" />
        <input ref={phoneRef} placeholder="Phone Number" />
        <input ref={streetRef} placeholder="Street Address" />
        <input ref={cityRef} placeholder="City" />

        <select ref={stateRef} defaultValue="">
          <option value="" disabled>
            Select State
          </option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>

        <input ref={pincodeRef} placeholder="Pincode" />

        <p>
          <strong>Payment:</strong> Cash on Delivery
        </p>

        <button type="button" onClick={placeOrder}>
          Place Order
        </button>
      </div>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <p>Items: {cart.length}</p>
        <p>
          Total: ₹{" "}
          {cart.reduce((sum, item) => sum + item.price * item.qty, 0) + 30}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <section className="checkout-section">
        <h1>Checkout</h1>
        {cart.length ? <ShowCheckout /> : <EmptyCart />}
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
