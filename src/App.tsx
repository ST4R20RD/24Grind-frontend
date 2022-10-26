import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from './components';
import { CardForm } from './components/CardForm';
import { Feed, Profile } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feed />} />
        <Route path='/Profile/:userId' element={<Profile />} />
        <Route path='/Create' element={<CardForm />} />
      </Route >
    </Routes >
  );
}

export default App;