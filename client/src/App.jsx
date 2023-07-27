import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Map from './components/Map'
import CreateAnimal from './components/CreateAnimal'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Map/>}/>
        <Route path='/create' element={<CreateAnimal/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App