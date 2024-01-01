import React, { useRef, useState } from 'react';
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
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const { isLoggedIn, errorMessage } = useSelector(state => state.auth);

  const handleSignin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: email.toLowerCase(),
        password,
      });
      if (isLoggedIn) {
        localStorage.setItem('jwt', response.data.accessToken);
        setSuccess(true);
        navigate('/management');
      } else {
        setErrorMsg('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      console.log(error)
      // setErrorMsg(error.message);
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
            <Link to='/signup'>
              <span>Sign Up</span>
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signin;
