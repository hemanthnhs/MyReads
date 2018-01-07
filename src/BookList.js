import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
 
const BookList = (props) => {
  const { books, onBookStatusChange } = props
  const defaultImg = require('./icons/blank-book.png') //To have a image on fetch failure or API failure

  return (
    <ol className='books-grid'>
    {
      //Displaying the books by looping over results from API and rendering the list by returning each
      books.map((book, index) => {
        const { title, imageLinks, authors, shelf } = book
        return (
          <li key={index}>
            <Book
                title={title}
                imgUrl={(imageLinks && imageLinks.thumbnail) || defaultImg}
                authors={authors}
                status={shelf}
                onBookStatusChange={(newStatus) => onBookStatusChange(book, newStatus)}
            />
          </li>
        )
      })
    }
    </ol>
  )
}

BookList.PropTypes = {
  books: PropTypes.array.required,
  onBookStatusChange: PropTypes.func.required
}

export default BookList
