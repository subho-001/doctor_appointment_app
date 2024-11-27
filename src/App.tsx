import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DoctorListingPage from './pages/DoctorListingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchPage/>}/>
        <Route path='/doctors' element={<DoctorListingPage/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}


export default App;
