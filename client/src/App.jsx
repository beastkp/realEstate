import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './Components/Header';

function App() {
  const arr = ["gi","go","hajd"];
  console.log(arr);
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/sign-in' element={<Signin/>}/>
        <Route exact path='/sign-up' element={<Signup/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App