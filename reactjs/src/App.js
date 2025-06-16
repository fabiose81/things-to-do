import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Suggestion from './pages/Suggestion';
import Prompt from './pages/Prompt';
import NavigationComponent from './components/NavigationComponent';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <NavigationComponent />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Navigate replace to="/prompt" />} exact />
            <Route path='/prompt' element={<Prompt />} />
            <Route path='/suggestions' element={<Suggestion />} />
          </Routes>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
