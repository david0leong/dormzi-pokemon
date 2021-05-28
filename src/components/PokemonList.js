import React, { useEffect, useState } from 'react'

import { fetchPokemons } from '../utils/api'

import Loading from './Loading'
import PokemonTable from './PokemonTable'

const PokemonList = () => {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])

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
      <PokemonTable pokemons={pokemons} />
    </div>
  )
}

export default PokemonList
