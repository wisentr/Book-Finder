import React, { Component } from "react";
import classes from "./App.module.css";
import axios from "axios";
import BookCard from "./components/BookCard/BookCard";
import Cockpit from "./components/Cockpit/Cockpit";
import { Icon, Grid } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    //example of writing as methods, not properties of this class. The rest is properties.
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }
  state = {
    bookCards: [],
    searchQuery: "",
    error: false,
    errorMessage: "",
    loading: false,
  };

  inputChangedHandler(event) {
    this.setState({ searchQuery: event.target.value, error: false });
  }

  buttonClickedHandler = () => {
    this.setState({ loading: true });
    console.log("button clicked");
    const key = "AIzaSyDUOpEJ5dqq_-RUdLJLfTpSMZZ2Q2sJiyQ";
    const url = "https://www.googleapis.com/books/v1/volumes?q=";
    const finalUrl = `${
      url + this.state.searchQuery
    }&key=${key}&maxResults=40&orderBy=relevance`;

    axios
      .get(finalUrl)
      .then((response) => {
        const booksToSetState = this.dataRefinement(response.data.items);
        this.setState({ bookCards: booksToSetState, loading: false });
        console.log("booksToSetState: after dataRefinement call");
        console.log(this.state.bookCards);
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ error: true, errorMessage: error.response.status });
        } else if (error.request) {
          this.setState({ error: true, errorMessage: error.request });
        } else {
          console.log(
            "Something happened in setting up the request that triggered an Error"
          );
          this.setState({ error: true, errorMessage: error.message });
        }
      });
  };

  dataRefinement = (arr) => {
    console.log("from dataRefinement method..");
    arr.forEach((book) => {
      if (!book.volumeInfo.hasOwnProperty("imageLinks")) {
        book.volumeInfo.imageLinks = {
          thumbnail:
            "https://books.google.pl/googlebooks/images/no_cover_thumb.gif",
        };
        //book.volumeInfo.imageLinks.thumbnail =
        console.log(book);
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
    console.log("All books have imageLinks property now.. ");
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
        {console.log(this.state.loading)}
        {icon}
        <Grid stackable columns={2} className={classes.Container}>
          {books}
        </Grid>
      </div>
    );
  }
}

export default App;
