import React from 'react'
import PropTypes from 'prop-types'
 
 //On book state change
const BookStatusSelect = (props) => {
  const {status, onChange} = props

  return (
    <select value={status || 'none'} onChange={(event) => onChange(event.target.value)}>
        <option value='moveTo' disabled>Move to...</option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='none'>None</option>
    </select>
  )
}

BookStatusSelect.PropTypes = {
  status: PropTypes.string.required,
  onChange: PropTypes.func.required
}

export default BookStatusSelect
