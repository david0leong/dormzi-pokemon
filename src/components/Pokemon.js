import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Image from 'react-bootstrap/Image'

import { fetchPokemon } from '../utils/api'

import Loading from './Loading'
import NotFound from './NotFound'

const Pokemon = () => {
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [pokemon, setPokemon] = useState(null)

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

  if (loading) {
    return <Loading />
  }

  if (!pokemon) {
    return <NotFound />
  }

  return (
    <div className="p-4 d-flex">
      <div className="mr-3">
        <Image
          src={pokemon.picture}
          rounded
          className="border border-dark rounded"
        />
      </div>

      <div className="flex-grow-1">
        <p>
          <b>English Name:</b> {pokemon.ename}
        </p>

        <p>
          <b>Chinese Name:</b> {pokemon.cname}
        </p>

        <p>
          <b>Japanese Name:</b> {pokemon.jname}
        </p>

        <p>
          <b>Image ID:</b> {pokemon.id}
        </p>

        <p>
          <b>Skills:</b>

          <br />

          <p className="ml-3 mb-1">
            <b>Egg:</b> {pokemon.skills.egg.join(', ')}
          </p>

          <p className="ml-3 mb-1">
            <b>Level Up:</b> {pokemon.skills.level_up.join(', ')}
          </p>

          <p className="ml-3 mb-1">
            <b>TM:</b> {pokemon.skills.tm.join(', ')}
          </p>

          <p className="ml-3 mb-1">
            <b>Transfer:</b> {pokemon.skills.transfer.join(', ')}
          </p>

          <p className="ml-3 mb-1">
            <b>Tutor:</b> {pokemon.skills.tutor.join(', ')}
          </p>
        </p>
      </div>
    </div>
  )
}

export default Pokemon
