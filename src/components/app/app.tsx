import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from "../../pages/index";

function App() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/*' element={<LoginPage />}/>
    </Routes>
  );
}

export default App;
