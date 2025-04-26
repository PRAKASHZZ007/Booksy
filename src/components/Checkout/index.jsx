import { Component } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import UserDetailsForm from "../UserDetailsForm";
import "./index.css";

class Checkout extends Component {
  state = {
    orderPlaced: false,
    userDetails: null  // Store user details when form is submitted
  };

  handleOrderSubmit = (userDetails) => {
    this.setState({ 
      orderPlaced: true,
      userDetails 
    });
    // Clear the cart after order is placed
    this.context.resetCart();
  };

  renderOrderSummary = (cartList) => {
    const total = cartList.reduce((sum, item) => {
      return sum + parseFloat(item.price.slice(1));
    }, 0);

    return (
      <div className="summary-container">
        {cartList.map((item) => (
          <div key={item.isbn13} className="summary-item-container">
            <img src={item.image} alt={item.title} className="summary-item-image" />
            <p className="summary-item-title">{item.title}</p>
            <p className="summary-item-price">{item.price}</p>
          </div>
        ))}
        <div className="summary-item-container">
          <p className="summary-total-title">Total</p>
          <p className="summary-total-price">{`$${total.toFixed(2)}`}</p>
        </div>
      </div>
    );
  };

  renderOrderConfirmation = (cartList) => {
    const { userDetails } = this.state;
    const total = cartList.reduce((sum, item) => {
      return sum + parseFloat(item.price.slice(1));
    }, 0);

    return (
      <div className="order-confirmation">
        <h1>Thank you for your order!</h1>
        <div className="order-details-container">
          <div className="user-details">
            <h2>Delivery Information</h2>
            <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
            <p><strong>Country:</strong> {userDetails.country}</p>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            {cartList.map((item) => (
              <div key={item.isbn13} className="order-item">
                <img src={item.image} alt={item.title} className="order-item-image" />
                <div>
                  <p className="order-item-title">{item.title}</p>
                  <p className="order-item-price">{item.price}</p>
                </div>
              </div>
            ))}
            <div className="order-total">
              <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <Link to="/">
          <button className="home-button">Back to Home</button>
        </Link>
      </div>
    );
  };

  render() {
    return (
      <CartContext.Consumer>
        {(value) => {
          const { cartList } = value;
          const { orderPlaced } = this.state;

          if (orderPlaced) {
            return this.renderOrderConfirmation(cartList);
          }

          return (
            <>
              <div className="checkout-page-container">
                <div className="checkout-banner">
                  <div className="checkout-banner-content-container">
                    <div className="logo-container">
                      <Link to="/" className="nav-link">
                        <div className="logo">C</div>
                        CROSSWORD
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="checkout-form">
                  <div className="checkout-content-container">
                    <h1 className="checkout-heading">Checkout</h1>
                    <Link to="/cart" className="back-button">
                      <FaArrowLeft className="back-icon" />
                    </Link>
                    <div className="form-and-summary">
                      <UserDetailsForm onSubmit={this.handleOrderSubmit} />
                      {this.renderOrderSummary(cartList)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

// Add contextType to access context in class methods
Checkout.contextType = CartContext;

export default Checkout;