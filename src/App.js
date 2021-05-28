import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/Header'
import Pokemon from './components/Pokemon'
import PokemonList from './components/PokemonList'

function App() {
  return (
    <div>
      <Header />

      {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Switch>
        <Route strict path="/">
          <Redirect to="/pokemon" />
        </Route>

        <Route strict path="/pokemon">
          <PokemonList />
        </Route>

        <Route strict path="/pokemon/:id">
          <Pokemon />
        </Route>
      </Switch>
    </div>
  )
}

export default App
