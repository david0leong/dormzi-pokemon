import React from 'react'
import Image from 'react-bootstrap/Image'

import './style.scss'

const PokemonSlide = ({ pokemon }) => {
  return (
    <div className="pokemon-slide">
      <Image src={pokemon.picture} alt={pokemon.name} className="w-100" />

      <div className="pokemon-slide-overlay">
        <h1 className="m-0">{pokemon.name}</h1>
      </div>
    </div>
  )
}

export default PokemonSlide
