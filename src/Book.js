import React from 'react'
import PropTypes from 'prop-types'
import BookStatusSelect from './BookStatusSelect'
 
const Book = (props) => {
  const {
    title,
    imgUrl,
    status,
    authors,
    onBookStatusChange
  } = props

  return (
    <div className='book'>
      <div className='book-top'>
        <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${imgUrl})` }}></div>
        <div className='book-shelf-changer'>
          <BookStatusSelect status={status} onChange={onBookStatusChange}/>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      <div className='book-authors'>
        {
          authors && authors.join(', ')
        }
      </div>
    </div>
  )
}

Book.PropTypes = {
  title: PropTypes.string.required,
  imgUrl: PropTypes.string.required,
  status: PropTypes.string.required,
  authors: PropTypes.array,
  onBookStatusChange: PropTypes.func.required
}

export default Book
