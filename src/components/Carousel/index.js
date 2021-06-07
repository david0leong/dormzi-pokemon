import React, { useState, useEffect } from 'react'

import './style.scss'

const Carousel = ({ slide = 1, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children.length)

  const handleNext = () => {
    if (currentIndex < length - slide) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  // Set the length to match current children from props
  useEffect(() => {
    setCurrentIndex(0)
    setLength(children.length)
  }, [children])

  return (
    <div className="carousel-wrapper">
      {currentIndex > 0 && (
        <button className="btn-arrow left" onClick={handlePrev}>
          &lt;
        </button>
      )}

      <div className="carousel-content-wrapper">
        <div
          className={`carousel-content show-${slide}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / slide)}%)`,
          }}
        >
          {children}
        </div>
      </div>

      {currentIndex < length - slide && (
        <button className="btn-arrow right" onClick={handleNext}>
          &gt;
        </button>
      )}
    </div>
  )
}

export default Carousel
