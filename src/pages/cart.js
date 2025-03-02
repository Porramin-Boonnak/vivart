import { useEffect, useState, useRef } from "react";
import Searchbar from "../component/searchbar";
import Navbar from "../component/navbar";
import "../pagescss/cart.css";
import "@fontsource/fredoka";
import bird from "../pictures/bird.jpg";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // เริ่มต้นเป็น [] แล้วค่อยอัปเดต
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(API_URL + '/status', { token: localStorage.getItem('token') })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(error => {
        alert("Please login");
        navigate('/signin');
      });
  }, [API_URL, navigate]);
  
  useEffect(() => {
    if (user && user._id && !hasFetched.current) {
      hasFetched.current = true;
      axios.get(`${API_URL}/cart/${user._id}`)
        .then(response => {
          const newCart = response.data.map(item => ({
            id: item._id_post,
            name: item.name,
            price: Number(item.price),
            quantity: item.quantity,
            image: item.img?.[0] || bird,
            typepost : item.typepost,
            type : item.type // Ensure 'bird' is defined and imported
          }));
          setCart(newCart);
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
          // Optionally, you can set an error state here to display a message to the user
        });
    }
  }, [user]);
  const updateQuantity = (id, change) => {
    const newQuantity = Math.max(1, cart.find(item => item.id === id).quantity + change);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    axios.put(`${API_URL}/cart/${user._id}/${id}`, { quantity: newQuantity })
      .catch(error => console.error("Error updating quantity:", error));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    axios.delete(`${API_URL}/cart/${user._id}/${id}`)
      .then(response => {
          console.log(response.data);
      })
      .catch(error => console.error("Error removing item:", error));
};
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>

        <Navbar />
        <Searchbar />

      <div className="cart-layout">
        {/* Cart Section */}   <h2>Your Cart</h2>      <h2 style={{}}>Order Summary</h2>
        <div className="cart-section-wrapper">

          <div className="cart-section">
 
            <div className="cart-header-wrapper">

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
                  {item.typepost === "uniq" ? <></>:<div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>}
                </div>
                <div className="cart-cell subtotal-remove-cell">
                      <span className="subtotal">{(item.price * item.quantity).toLocaleString()} THB</span>
                   
                </div>
                <div className="cart-cell subtotal-remove-cell">
                    <button onClick={() => removeItem(item.id)} className="remove-btn" >X</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary-wrapper">
          <div className="order-summary">

            {cart.map((item) => (
              <p key={item.id} className="summary-item">
                {item.name} <span>{(item.price * item.quantity).toLocaleString()} THB</span>
              </p>
            ))}
            <div className="total">
              <strong>Total:</strong> <span>{totalPrice.toLocaleString()} THB</span>
            </div>
        
          </div>
          <button className="checkout-btn mt-3" onClick={()=>navigate("/shipping")}>Check Out</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
