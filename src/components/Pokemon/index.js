import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Image from 'react-bootstrap/Image'

import { fetchPokemon } from '../../utils/api'

import Loading from '../Loading'
import NotFound from '../NotFound'

import PokemonModal from './PokemonModal'

import './style.scss'

const Pokemon = () => {
  const { id } = useParams()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [pokemon, setPokemon] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleKeyDown = useCallback(
    e => {
      const intId = parseInt(id)

      // Left key
      if (e.keyCode === 37 && intId > 0) {
        history.push(`/pokemon/${intId - 1}`)
      }

      // Right key
      if (e.keyCode === 39) {
        history.push(`/pokemon/${intId + 1}`)
      }
    },
    [id] // eslint-disable-line
  )

  const toggleModal = useCallback(() => {
    setShowModal(!showModal)
  }, [showModal])

  useEffect(() => {
    // Fetch pokemon
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data } = await fetchPokemon(id)

        setPokemon(data)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  if (loading) {
    return <Loading />
  }

  if (!pokemon) {
    return <NotFound />
  }

  return (
    <>
      <div className="p-4 d-flex">
        <div className="mr-3 p-2">
          <Image
            src={pokemon.picture}
            rounded
            className="border border-dark rounded pokemon-img"
            onClick={toggleModal}
          />
        </div>

        <div className="flex-grow-1">
          <div className="mb-2">
            <b>English Name:</b> {pokemon.ename}
          </div>

          <div className="mb-2">
            <b>Chinese Name:</b> {pokemon.cname}
          </div>

          <div className="mb-2">
            <b>Japanese Name:</b> {pokemon.jname}
          </div>

          <div className="mb-2">
            <b>Image ID:</b> {pokemon.id}
          </div>

          <div className="mb-2">
            <div className="mb-1">
              <b>Skills:</b>
            </div>

            <div className="ml-3">
              <div className="mb-1">
                <b>Egg:</b> {pokemon.skills.egg?.join(', ')}
              </div>

              <div className="mb-1">
                <b>Level Up:</b> {pokemon.skills.level_up?.join(', ')}
              </div>

              <div className="mb-1">
                <b>TM:</b> {pokemon.skills.tm?.join(', ')}
              </div>

              <div className="mb-1">
                <b>Transfer:</b> {pokemon.skills.transfer?.join(', ')}
              </div>

              <div className="mb-1">
                <b>Tutor:</b> {pokemon.skills.tutor?.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PokemonModal show={showModal} pokemon={pokemon} onClose={toggleModal} />
    </>
  )
}

export default Pokemon
