import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from './components';
import {Feed, Groups, Profile, InsideGroup} from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Feed />} />
        <Route path='/Groups' element={<Groups/>}/>
        <Route path='/Groups/:id' element={<InsideGroup/>}/>
        <Route path='/Profile' element={<Profile/>}/>
      </Route>
    </Routes>
  );
}

export default App;