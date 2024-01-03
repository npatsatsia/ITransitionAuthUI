import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Routes/index';
import Header from './components/header';

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const showHeader = location.pathname === '/management'

  useEffect(() => {
    if(location.pathname === '/'){
      navigate('/signin')
    }
  },[])

  return(
    <div className='app'>
      <Header isManagementPage={showHeader} />
      <Router/>
    </div>
  )
}

export default App;
