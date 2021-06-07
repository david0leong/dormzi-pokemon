import React from 'react'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'

const PokemonModal = ({ show, pokemon, onClose }) => {
  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Body>
        <Image src={pokemon.picture} rounded />
      </Modal.Body>
    </Modal>
  )
}

export default PokemonModal
