import React, { Component } from "react";
import BookItem from "../BookItem";
import PriceRange from "../PriceRange";
import { TailSpin } from "react-loader-spinner";
import Header from "../Header";
import "./index.css";

const priceRangeExtreme = [0, 1000];

class BookList extends Component {
  state = {
    booksData: [],
    apiStatus: "INITIAL",
    priceRangeValue: priceRangeExtreme,
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    this.setState({ apiStatus: "IN_PROGRESS" });
    try {
      const response = await fetch("https://api.itbook.store/1.0/new");
      const data = await response.json();
      const books = data.books.map((book) => ({
        ...book,
        price: Math.floor(Math.random() * 1000), // Fake price for filtering
      }));
      this.setState({ booksData: books, apiStatus: "SUCCESS" });
    } catch (error) {
      this.setState({ apiStatus: "FAILURE" });
    }
  };

  onChangeSliderPosition = (newRange) => {
    this.setState({ priceRangeValue: newRange });
  };

  filterBooksByPriceRange = () => {
    const { booksData, priceRangeValue } = this.state;
    return booksData.filter(
      (book) =>
        book.price >= priceRangeValue[0] && book.price <= priceRangeValue[1]
    );
  };

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <TailSpin color="#0284c7" height={50} width={50} />
    </div>
  );

  renderFailureView = () => (
    <div className="failure-container">
      <h1>Something went wrong. Please try again later.</h1>
    </div>
  );

  renderSuccessView = () => {
    const filteredBooks = this.filterBooksByPriceRange();
    const { priceRangeValue } = this.state;

    return (
      <>
        <Header />
        <h1 className="book-items-heading">Books</h1>
        <PriceRange
          sliderExtremes={priceRangeExtreme}
          sliderPositions={priceRangeValue}
          onChangeSliderPosition={this.onChangeSliderPosition}
        />
        <ul className="book-list-container">
          {filteredBooks.map((book) => (
            <BookItem key={book.isbn13} bookItemDetails={book} />
          ))}
        </ul>
      </>
    );
  };

  render() {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case "SUCCESS":
        return this.renderSuccessView();
      case "FAILURE":
        return this.renderFailureView();
      case "IN_PROGRESS":
        return this.renderLoadingView();
      default:
        return null;
    }
  }
}

export default BookList;
