import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
 
const HomePage = (props) => {
  const { books, onBookStatusChange } = props
  const bookShelves = [
    {
      title: 'Currently Reading',
      books: books.filter((b) => b.shelf === 'currentlyReading')
    },
    {
      title: 'Want to Read',
      books: books.filter((b) => b.shelf === 'wantToRead')
    },
    {
      title: 'Read',
      books: books.filter((b) => b.shelf === 'read')
    }
  ]

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
      {
        bookShelves.map((bookShelf, index) => (
          <BookShelf
            key={index}
            title={bookShelf.title}
            books={bookShelf.books}
            onBookStatusChange={onBookStatusChange}
          />
        ))
      }
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

HomePage.PropTypes = {
  books: PropTypes.array.required,
  onBookStatusChange: PropTypes.func.required
}

export default HomePage
