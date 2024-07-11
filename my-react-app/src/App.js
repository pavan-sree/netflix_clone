import React, { useState } from 'react';
import './App.css';
import {Auth} from './components/auth';
import {Home} from './components/home';
import {Movies} from './components/movies';
import {Mylist} from './components/Mylist';
import {TvShow} from './components/tvShow'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [user, setUser] = useState({email: 'not loged in'});
  
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        
        <Route path='/' element={<Auth setUser={setUser}/>}/>
        <Route path='/home' element={<Home user={user}/>}/>
        <Route path='/movies' element={<Movies user={user}/>}/>
        <Route path='/Mylist' element={<Mylist user={user}/>}/>
        <Route path='/tvShow' element={<TvShow user={user}/>}/>
       
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
