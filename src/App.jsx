import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import NotFound from "./components/NotFound";
import CartContext from "./context/CartContext";

import "./App.css";

class App extends Component {
  state = {
    cartList: [],
  };

  addToCart = (bookItem) => {
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, bookItem],
    }));
  };

  increaseQuantity = (cartItem) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((item) =>
        item.isbn13 === cartItem.isbn13
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  };
  
  decreaseQuantity = (cartItem) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((item) =>
        item.isbn13 === cartItem.isbn13 && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  };
  deleteFromCart = (cartItem) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.filter(
        (eachCartItem) => eachCartItem.isbn13 !== cartItem.isbn13
      ),
    }));
  };

  resetCart = () => {
    this.setState({ cartList: [] });
  };

  render() {
    const { cartList } = this.state;
    return (
      <CartContext.Provider
        value={{
          cartList,
          addToCart: this.addToCart,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          deleteFromCart: this.deleteFromCart,
          resetCart: this.resetCart,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </CartContext.Provider>
    );
  }
}

export default App;
