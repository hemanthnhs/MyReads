import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import ShowSearchPage from './ShowSearchPage'
import HomePage from './HomePage'

const INITIAL_STATE = {
  books: []
}

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = INITIAL_STATE
    this.handleBookStatusChange = this.handleBookStatusChange.bind(this)
  }

  componentDidMount() {
    this.fetchAllBooks()
  }

  fetchAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  updateBook(book, shelf) {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf)
        .then((response) => {
          book.shelf = shelf
          this.setState({
            books: this.state.books.filter(b => b.id !== book.id).concat([ book ])
          })
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }

  handleBookStatusChange(book, newStatus) {
    this.updateBook(book, newStatus)
  }

  render() {
    const { books } = this.state

    return (
      <div className='app'>
        <Switch>
          <Route exact path='/' render={() =>
            <HomePage books={books} onBookStatusChange={this.handleBookStatusChange}/>
          }/>
          <Route exact path='/search' render={() =>
            <ShowSearchPage followingBooks={books} onBookStatusChange={this.handleBookStatusChange}/>
          }/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
