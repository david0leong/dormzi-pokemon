import React from 'react'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router-dom'

const PokemonTable = ({ pokemons }) => {
  const history = useHistory()

  const handleClick = pokemon => {
    history.push(`/pokemon/${pokemon.id}`)
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        {pokemons.map(pokemon => (
          <tr
            key={pokemon.id}
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick(pokemon)}
          >
            <td>{pokemon.id}</td>
            <td>{pokemon.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default PokemonTable
