import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchTerms from './search-query/searchTerms'
import { Throttle } from 'react-throttle'
 
const INITIAL_STATE = {
  searchBooks: []
}

class ShowSearchPage extends Component {
  constructor(props) {
    super(props)

    this.searchBooks = this.searchBooks.bind(this)
    this.state = INITIAL_STATE
  }

  isValidQuery(query = '') {
    const lowerCasedQuery = query.toLowerCase()
    return query.length !== 0 && SearchTerms.includes(lowerCasedQuery)
  }

  searchBooks(query, maxResults=10) {
    if (!this.isValidQuery(query)) {
      return
    }

    BooksAPI.search(query, maxResults)
      .then((results) => {
        if (results.error) {
          console.log(results.error)
          return
        }

        this.setState({ searchBooks: results })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  mapBooksWithId(books) {
    const initialValue = {}
    const mapIdBookReducer = (mappedBooks, book) => {
      mappedBooks[book.id] = book
      return mappedBooks
    }
    return books.reduce(mapIdBookReducer, initialValue)
  }

  updateBooksStatus(searchBooks, followingBooks) {
    const mappedFollowingBooks = this.mapBooksWithId(followingBooks)

    return searchBooks.map((book) => {
      if (book.id in mappedFollowingBooks) {
        const shelf = mappedFollowingBooks[book.id].shelf
        return { ...book, shelf }
      }
      return book
    })
  }

  render() {
    const { searchBooks } = this.state
    const { followingBooks, onBookStatusChange } = this.props
    const searchBooksWithStatus = this.updateBooksStatus(searchBooks, followingBooks)

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <Throttle time='500' handler='onChange'>
              <input
                type='text'
                placeholder='Search by title or author'
                onChange={(event) => this.searchBooks(event.target.value)}
              />
            </Throttle>
          </div>
        </div>
        <div className='search-books-results'>
          <BookList books={searchBooksWithStatus} onBookStatusChange={onBookStatusChange}/>
        </div>
      </div>
    )
  }
}

ShowSearchPage.PropTypes = {
  followingBooks: PropTypes.array.required,
  onBookStatusChange: PropTypes.func.required
}

export default ShowSearchPage
