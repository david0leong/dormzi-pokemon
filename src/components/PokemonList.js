import React, { useEffect, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
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
  const [slide, setSlide] = useState(false)

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
    <>
      <div className="p-4">
        <div className="d-flex mb-4">
          <Button variant="info" onClick={handleToggleView}>
            {tableView ? 'View in tiles' : 'View in table'}
          </Button>

          <Dropdown className="ml-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Slideshow
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSlide(1)}>
                Slide by 1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSlide(2)}>
                Slide by 2
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSlide(3)}>
                Slide by 3
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSlide(4)}>
                Slide by 4
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        show={slide > 0}
        slide={slide}
        pokemons={pokemons}
        onClose={() => setSlide(0)}
      />
    </>
  )
}

export default PokemonList
