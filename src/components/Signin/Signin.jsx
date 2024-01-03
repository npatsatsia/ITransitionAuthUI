import React, { useEffect, useRef, useState } from 'react';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/auth';

const Signin = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const { isLoggedIn } = useSelector(state => state.auth);
  const { showMessage } = useSelector(state => state.message);

  useEffect(() => {
    setErrorMsg(showMessage)
  },[showMessage])

  useEffect(() => {
      if (localStorage.getItem('jwt')) {
        navigate('/management');
      }
  },[isLoggedIn])

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg('')
    }, 6000);
  }, [errorMsg])

  const handleSignUpClick = () => {
    // Navigate to the 'signin' route
    navigate('/signup');
};

  const handleSignin = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const last_login_time = currentDate.toISOString();
  
    try {
      dispatch(login({email: email.toLowerCase(), password, last_login_time}))
    } 
    catch (error) {
      console.error('Error during login:', error);
      console.log(error)
    }
  };

  return (
    <section className='section-body'>
      <div className='section-center'>
        <p ref={errorRef} className={errorMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
          {errorMsg}
        </p>
        <h1>Sign In</h1>
        <form className='form-center' onSubmit={handleSignin}>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-describedby='uidnote'
          />

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            aria-describedby='pwdnote'
          />
          <button className='button' disabled={!email || !password ? true : false}>
            Sign In
          </button>
        </form>
        <p>
          I Want To Register<br />
          <span className='line'>
              <span onClick={handleSignUpClick}>Sign Up</span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signin;
