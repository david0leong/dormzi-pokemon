import axios from 'axios'

export const fetchPokemons = () =>
  axios.get('http://pokemon.test.dormzi.com/pokemon')

export const fetchPokemon = id =>
  axios.get(`http://pokemon.test.dormzi.com/pokemon/${id}`)
