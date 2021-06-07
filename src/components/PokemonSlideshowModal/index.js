import React from 'react'
import Modal from 'react-bootstrap/Modal'

import Carousel from '../Carousel'
import PokemonSlide from '../PokemonSlide'

import './style.scss'

const PokemonSlideshowModal = ({ show, slide = 1, pokemons, onClose }) => {
  return (
    <Modal
      centered
      show={show}
      dialogClassName={`pokemon-slideshow-modal show-${slide}`}
      onHide={onClose}
    >
      <Modal.Body>
        <Carousel slide={slide}>
          {pokemons.map(pokemon => (
            <PokemonSlide key={pokemon.id} pokemon={pokemon} />
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  )
}

export default PokemonSlideshowModal
