import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/Header'
import Pokemon from './components/Pokemon'
import PokemonList from './components/PokemonList'

function App() {
  return (
    <div>
      <Header />

      <Switch>
        <Redirect exact from="/" to="/pokemon" />

        <Route exact path="/pokemon">
          <PokemonList />
        </Route>

        <Route exact path="/pokemon/:id">
          <Pokemon />
        </Route>
      </Switch>
    </div>
  )
}

export default App
