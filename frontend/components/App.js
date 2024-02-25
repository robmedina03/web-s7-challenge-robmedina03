import React from 'react'
import Home from './Home'
import Form from './Form'
import { BrowserRouter as Router, Link, Route,Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div id="app">
      <nav>
        <Link to= "W_S7_Challenge" className= "active" aria-current= "page" >Home</Link>
        <Link to= "/form" className= "active" aria-current= "page" >Order</Link>
      </nav>
      <Routes>
      <Route path= "W_S7_Challenge" element={<Home />} />
      <Route path= "/form" element={<Form />} />
      </Routes>
      <Home />
      <Form />
    </div>
    </Router>
  )
}

export default App
