import React, { useState } from "react";
import Searchbar from "../component/searchbar";
import Navbar from "../component/navbar";
import "../pagescss/cart.css";
import "@fontsource/fredoka";
import bird from "../pictures/bird.jpg";

const initialCart = [
  { id: 1, name: "Light star", price: 7000, quantity: 1, image: bird },
  { id: 2, name: "Reach star", price: 10000, quantity: 1, image: bird },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        <Searchbar />
      </div>
      <div className="cart-layout">
        {/* Cart Section */}
        <div className="cart-section-wrapper">
          <div className="cart-section">
            <div className="cart-header-wrapper">
              <h2>Your Cart</h2>
              <div className="cart-header">
                <div className="header-cell">Product(s)</div>
                <div className="header-cell">Price</div>
                <div className="header-cell">Quantity</div>
                <div className="header-cell">Subtotal</div>
              </div>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-cell product-cell">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <span className="item-name">{item.name}</span>
                </div>
                <div className="cart-cell price-cell">
                  <span className="item-price">{item.price.toLocaleString()} THB</span>
                </div>
                <div className="cart-cell quantity-cell">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="cart-cell subtotal-remove-cell">
                  <span className="subtotal">{(item.price * item.quantity).toLocaleString()} THB</span>
                  <button onClick={() => removeItem(item.id)} className="remove-btn">X</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary-wrapper">
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <p key={item.id} className="summary-item">
                {item.name} <span>{(item.price * item.quantity).toLocaleString()} THB</span>
              </p>
            ))}
            <div className="total">
              <strong>Total:</strong> <span>{totalPrice.toLocaleString()} THB</span>
            </div>
            <button className="checkout-btn">Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
