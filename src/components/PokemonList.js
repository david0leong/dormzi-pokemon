import React, { useEffect, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import slice from 'lodash/slice'

import { fetchPokemons } from '../utils/api'

import Loading from './Loading'
import PokemonTable from './PokemonTable'
import PokemonPagination from './PokemonPagination'
import PokemonTiles from './PokemonTiles'
import PokemonSlideshowModal from './PokemonSlideshowModal'

const PokemonList = () => {
  const [loading, setLoading] = useState(false)
  const [tableView, setTableView] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [visiblePokemons, setVisiblePokemons] = useState([])
  const [showSlideshowModal, setShowSlideshowModal] = useState(false)

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

  const handleToggleSlideshowModal = useCallback(() => {
    setShowSlideshowModal(!showSlideshowModal)
  }, [showSlideshowModal])

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
    <>
      <div className="p-4">
        <div className="mb-4">
          <Button variant="info" onClick={handleToggleView}>
            {tableView ? 'View in tiles' : 'View in table'}
          </Button>

          <Button
            variant="success"
            className="ml-2"
            onClick={handleToggleSlideshowModal}
          >
            View Slideshow
          </Button>
        </div>

        <PokemonPagination
          initialPage={1}
          initialPageSize={10}
          total={pokemons.length}
          onChange={handlePaginationChange}
        />

        {tableView ? (
          <PokemonTable pokemons={visiblePokemons} />
        ) : (
          <PokemonTiles pokemons={visiblePokemons} />
        )}
      </div>

      <PokemonSlideshowModal
        show={showSlideshowModal}
        slide={3}
        pokemons={pokemons}
        onClose={handleToggleSlideshowModal}
      />
    </>
  )
}

export default PokemonList
