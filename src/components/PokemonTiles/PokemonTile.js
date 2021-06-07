import React from 'react'
import Image from 'react-bootstrap/Image'
import { useHistory } from 'react-router-dom'

const PokemonTile = ({ pokemon }) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(`/pokemon/${pokemon.id}`)
  }

  return (
    <Image
      src={pokemon.picture}
      alt={pokemon.name}
      rounded
      className="pokemon-tile"
      onClick={handleClick}
    />
  )
}

export default PokemonTile
