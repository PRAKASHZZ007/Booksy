import { Link } from "react-router-dom";
import Header from "../Header";
import CartItem from "../CartItem";
import CartContext from "../../context/CartContext";
import "./index.css";

const Cart = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList, resetCart, deleteFromCart, increaseQuantity, decreaseQuantity } = value;
      const isCartEmpty = cartList.length === 0;
      let total = 0;
      
      if (!isCartEmpty) {
        total = cartList.reduce((sum, item) => {
          const price = parseFloat(item.price.slice(1));
          const quantity = item.quantity || 1;
          return sum + (price * quantity);
        }, 0);
      }

      return (
        <>
          <Header />
          <div className="cart-page-container">
            <div className="cart-content-container">
              <h1 className="cart-heading">
                {isCartEmpty ? "Your cart is empty!" : "Your Cart"}
              </h1>
              <div className="cart-container">
                {cartList.map((cartItem) => (
                  <CartItem
                    key={cartItem.isbn13}
                    cartItemDetails={cartItem}
                    handleDelete={deleteFromCart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                ))}
                {isCartEmpty ? (
                  <Link to="/books" className="continue-shopping-button-link">
                    <button className="checkout-button remove-button">
                      Continue Shopping
                    </button>
                  </Link>
                ) : (
                  <>
                    <button
                      className="checkout-button remove-button"
                      onClick={resetCart}
                    >
                      Remove all
                    </button>
                  </>
                )}
              </div>
            </div>
            {!isCartEmpty && (
              <div className="order-content-container">
                <h1 className="order-title">Order Summary</h1>
                <div className="order-summary-container">
                  <div className="order-amount-container">
                    <p className="order-amount">Amount Payable:</p>
                    <h1 className="cart-price">{`$${total.toFixed(2)}`}</h1>
                  </div>
                  <p className="order-text">(inclusive of all taxes)</p>
                  <Link to="/checkout" className="continue-shopping-button-link">
                    <button className="checkout-button">
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      );
    }}
  </CartContext.Consumer>
);

export default Cart;