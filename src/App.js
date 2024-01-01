import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Routes/index';
import Header from './components/header';

function App() {
  const location = useLocation()
  const showHeader = location.pathname === '/management'
  return(
    <div className='app'>
      <Header isManagementPage={showHeader} />
      <Router/>
    </div>
  )
}

export default App;
