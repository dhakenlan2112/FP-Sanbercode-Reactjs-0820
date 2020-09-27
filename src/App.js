import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import Home from './Pages/Home'
import About from './Pages/About'
import Movies from './Pages/Movies'
import Games from './Pages/Games'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ChangePassword from './Pages/ChangePassword'


import Layout from './Component/Layout'
import Footer from './Component/Footer'
import { MovieProvider } from './Context/MovieContext'
import { GameProvider } from './Context/GameContext'
import {UserProvider} from './Context/UserContext'
import ProtectedRoute from './Component/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <GameProvider>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <ProtectedRoute path="/movies">
                  <Movies />
                </ProtectedRoute>
                <ProtectedRoute path="/games">
                  <Games />
                </ProtectedRoute>
                <ProtectedRoute path="/change_password">
                  <ChangePassword />
                </ProtectedRoute>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="*">
                   <div>Error 404: Page not found</div>
                </Route>
              </Switch>
            </Layout>
            <Footer />
          </Router>
        </GameProvider>
      </MovieProvider>
    </UserProvider>

  );
}

export default App;
