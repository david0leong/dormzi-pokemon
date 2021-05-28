import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './style.scss'

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading
