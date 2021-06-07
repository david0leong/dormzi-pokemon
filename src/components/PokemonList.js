import React, { useEffect, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import slice from 'lodash/slice'

import { fetchPokemons } from '../utils/api'

import Loading from './Loading'
import PokemonTable from './PokemonTable'
import PokemonPagination from './PokemonPagination'
import PokemonTiles from './PokemonTiles'

const PokemonList = () => {
  const [loading, setLoading] = useState(false)
  const [tableView, setTableView] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [visiblePokemons, setVisiblePokemons] = useState([])

  const handlePaginationChange = useCallback(
    ({ page, pageSize }) => {
      setVisiblePokemons(
        slice(pokemons, (page - 1) * pageSize, page * pageSize)
      )
    },
    [pokemons, setVisiblePokemons]
  )

  const handleToggleView = useCallback(() => {
    setTableView(!tableView)
  }, [tableView])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data } = await fetchPokemons()

        setPokemons(data)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="p-4">
      <PokemonPagination
        initialPage={1}
        initialPageSize={10}
        total={pokemons.length}
        onChange={handlePaginationChange}
      />

      <div className="mb-2">
        <Button variant="info" onClick={handleToggleView}>
          {tableView ? 'View in tiles' : 'View in table'}
        </Button>
      </div>

      {tableView ? (
        <PokemonTable pokemons={visiblePokemons} />
      ) : (
        <PokemonTiles pokemons={visiblePokemons} />
      )}
    </div>
  )
}

export default PokemonList
