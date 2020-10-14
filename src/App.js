import React, { Component } from "react";
import classes from "./App.module.css";
import axios from "axios";
import BookCard from "./components/BookCard/BookCard";
import Cockpit from "./components/Cockpit/Cockpit";
import { Icon, Grid } from "semantic-ui-react";

class App extends Component {
  state = {
    bookCards: [],
    searchQuery: "",
    error: false,
    errorMessage: "",
    loading: false,
  };

  inputChangedHandler = (event) => {
    this.setState({ searchQuery: event.target.value, error: false });
  };

  buttonClickedHandler = () => {
    this.setState({ loading: true });
    const url = `https://us-central1-fir-booksearch.cloudfunctions.net/search?searchQuery=${this.state.searchQuery}`;
    axios
      .get(url)
      .then((response) => {
        const booksToSetState = this.dataRefinement(
          response.data.message.items
        );
        this.setState({
          bookCards: booksToSetState,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMessage: error.message,
        });
      });
  };

  dataRefinement = (arr) => {
    arr.forEach((book) => {
      if (!book.volumeInfo.hasOwnProperty("imageLinks")) {
        book.volumeInfo.imageLinks = {
          thumbnail:
            "https://books.google.pl/googlebooks/images/no_cover_thumb.gif",
        };
      }
      if (!book.volumeInfo.hasOwnProperty("publisher")) {
        book.volumeInfo.publisher = "Unknown";
      }
      if (!book.volumeInfo.hasOwnProperty("title")) {
        book.volumeInfo.title = "Unknown";
      }
      if (!book.volumeInfo.hasOwnProperty("authors")) {
        book.volumeInfo.authors = "Unknown";
      }
    });
    return arr;
  };

  render() {
    let books = (
      <div>
        <p>Something went wrong! Error code:</p>
        <p>{this.state.errorMessage}</p>
      </div>
    );

    if (!this.state.error) {
      books = this.state.bookCards.map((book) => {
        return (
          <BookCard
            title={book.volumeInfo.title.toLowerCase()}
            author={book.volumeInfo.authors}
            publisher={book.volumeInfo.publisher}
            imageUrl={book.volumeInfo.imageLinks.thumbnail}
            link={book.volumeInfo.infoLink}
            key={book.id}
          />
        );
      });
    }

    const isLoading = this.state.loading;
    let icon;

    if (isLoading) {
      icon = <Icon loading name="spinner" size="big" />;
    }

    return (
      <div className={classes.App}>
        <Cockpit
          inputText={this.state.searchQuery}
          onInputChange={this.inputChangedHandler}
          onButtonClick={this.buttonClickedHandler}
        />
        {icon}
        <Grid stackable columns={2} className={classes.Container}>
          {books}
        </Grid>
      </div>
    );
  }
}

export default App;
