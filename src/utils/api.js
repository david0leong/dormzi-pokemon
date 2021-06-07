import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://pokemon.test.dormzi.com/',
})

export const fetchPokemons = () => axiosInstance.get('pokemon')

export const fetchPokemon = id => axiosInstance.get(`pokemon/${id}`)
