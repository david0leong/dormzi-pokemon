import React from 'react'

import PokemonTile from './PokemonTile'

import './style.scss'

const PokemonTiles = ({ pokemons }) => {
  return (
    <div className="pokemon-tiles-wrapper">
      {pokemons.map(pokemon => (
        <PokemonTile key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokemonTiles
