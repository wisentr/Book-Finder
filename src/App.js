import React, { Component } from 'react';
import classes from './App.module.css';
import axios from 'axios';
import BookCard from './components/BookCard/BookCard';
import Cockpit from './components/Cockpit/Cockpit';

class App extends Component {
  state = {
    bookCards: [],
    searchQuery: '',
    error: false,
    errorMessage: ''
  };
  
  inputChangedHandler = (event) => {
    this.setState({searchQuery: event.target.value, error:false })
  }

  buttonClickedHandler = () =>{
    console.log('button clicked');
    const key = 'AIzaSyCLyYTiU5ho4IHCfNY7X0AIYoqKUKUc3Tk';
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    const finalUrl = `${url+this.state.searchQuery}&key=${key}&maxResults=40&orderBy=relevance`;
    
    axios.get(finalUrl)
      .then(response => {
        const booksToSetState = this.dataRefinement(response.data.items);
        this.setState({bookCards: booksToSetState})
        console.log("booksToSetState: after dataRefinement call");
        console.log(this.state.bookCards);
      }
     )
     .catch(error => {
       if(error.response){
         this.setState({ error: true, errorMessage: error.response.status });
       }else if(error.request){
         this.setState({ error: true, errorMessage: error.request });
       }else{
         console.log('Something happened in setting up the request that triggered an Error');
         this.setState({ error: true, errorMessage: error.message  });
       }
     });
  }
  
  dataRefinement = (arr) => {
    console.log('from dataRefinement method..');
    arr.forEach(book => {
      if(!book.volumeInfo.hasOwnProperty('imageLinks')){
        book.volumeInfo.imageLinks = { };
        book.volumeInfo.imageLinks.thumbnail = 'https://image.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg'
        console.log(book);
      }
    });
    console.log('All books have imageLinks property now.. ');
    return arr;
  }

  render() {
    let books = 
        <div style={{textAlign: 'center'}}>
        <p>Something went wrong! Error code:</p>
        <p>{this.state.errorMessage}</p>
        </div>
    
    if(!this.state.error){
      books = this.state.bookCards.map(book => {
        return <BookCard
          title={book.volumeInfo.title}
          author={book.volumeInfo.authors}
          publisher={book.volumeInfo.publisher}
          imageUrl={book.volumeInfo.imageLinks.thumbnail}
          //"https://image.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg"
          key={book.id}
        />;
      });
    }
  
    return (
      <div className={classes.App}>
      <Cockpit 
        inputText={this.state.searchQuery}
        onInputChange={this.inputChangedHandler}
        onButtonClick={this.buttonClickedHandler}
      />
      {books}
      </div>
    );
  }
}

export default App;
