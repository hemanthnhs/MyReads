import React from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'
 
const BookShelf = (props) => {
  const { title, books, onBookStatusChange } = props

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
          <BookList books={books} onBookStatusChange={onBookStatusChange}/>
      </div>
    </div>
  )
}

BookShelf.PropTypes = {
  title: PropTypes.string.required,
  books: PropTypes.array.required,
  onBookStatusChange: PropTypes.func.required
}

export default BookShelf
