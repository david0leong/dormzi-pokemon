import React from 'react'
import Modal from 'react-bootstrap/Modal'

import Carousel from '../Carousel'

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
            <div key={pokemon.id} className="p-2">
              <img src={pokemon.picture} alt={pokemon.name} className="w-100" />
            </div>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  )
}

export default PokemonSlideshowModal
