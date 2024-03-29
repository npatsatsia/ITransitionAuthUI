import React from 'react'
import './Signup.css'
import { useRef, useState, useEffect } from 'react'
import {MdCheckCircle, MdOutlineClose, MdInfo } from 'react-icons/md'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {register} from '../../slices/auth'



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {

    const userRef = useRef()
    const errorRef = useRef()

    const [username, setUsername] = useState('')
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [passwordMatch, setPasswordMatch] = useState('')
    const [validPasswordMatch, setValidPasswordMatch] = useState(false)
    const [passwordMatchFocus, setPasswordMatchFocus] = useState(false)

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { showMessage } = useSelector((state) => state.message);


    const handleSignInClick = () => {
        // Navigate to the 'signin' route
        navigate('/signin');
    };


    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])


    useEffect(() => {
        setMessage(showMessage)
        console.log(showMessage)
    }, [showMessage])

    useEffect(() => {
        setValidUser(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidPasswordMatch(password === passwordMatch);
    }, [password, passwordMatch])

    useEffect(() => {
        setMessage('');
    }, [username, password, passwordMatch])

    useEffect(() => {
        setTimeout(() => {
          setMessage('')
        }, 6000);
      }, [message])

    const handleSubmit = (e) => {
        e.preventDefault()
      
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const registration_time = new Date().toISOString();

        function generateRandomUserId(length) {
          return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
        }
      
        const userID = generateRandomUserId(8);
      
        if (!v1 || !v2) {
          setMessage("Invalid Entry");
          return;
        }
      
        try {
          const resultAction = dispatch(register({ username: username.toLowerCase(), email: email.toLowerCase(), password, registration_time, userID, active: true }));
            console.log(resultAction)
          // Check if the action was fulfilled successfully
          if (resultAction) {
            setMessage('');
            setUsername('');
            setEmail('');
            setPassword('')
            setPasswordMatch('')
          } else if (false === 'rejected') {
            console.error('Error during registration:', resultAction.error.message);
            setMessage('Registration failed. Please try again.');
          }
        } catch (error) {
          console.error('Error during registration:', error);
          setMessage('Registration failed. Please try again.');
        }
      };
      
      
      

    
  return (
        <section className='section-body'>
            <div className='section-center'>
            <p ref={errorRef} className={`${message === 'successfully registered' ? 'succmsg' : 'errmsg'} ${!message && 'offscreen'}`} aria-live="assertive">{message}</p>
                <h1>Sign Up</h1>
                <form className='form-center' onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        email:
                        <MdCheckCircle className={validUser ? "valid" : "hide"} />
                        <MdOutlineClose className={validUser || !username ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="mail"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-describedby="uidnote"
                    />
                    <p id="uidnote" className={userFocus && username && !validUser ? "instructions" : "offscreen"}>
                        <MdInfo />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="username">
                        Username:
                        <MdCheckCircle className={validUser ? "valid" : "hide"} />
                        <MdOutlineClose className={validUser || !username ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        aria-invalid={validUser ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && username && !validUser ? "instructions" : "offscreen"}>
                        <MdInfo />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor="password">
                        Password:
                        <MdCheckCircle className={validPassword ? "valid" : "hide"} />
                        <MdOutlineClose className={validPassword || !password ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <MdInfo />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>


                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <MdCheckCircle className={validPasswordMatch && passwordMatch ? "valid" : "hide"} />
                        <MdOutlineClose className={validPasswordMatch || !passwordMatch ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setPasswordMatch(e.target.value)}
                        value={passwordMatch}
                        required
                        aria-invalid={validPasswordMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setPasswordMatchFocus(true)}
                        onBlur={() => setPasswordMatchFocus(false)}
                    />
                    <p id="confirmnote" className={passwordMatchFocus && !validPasswordMatch ? "instructions" : "offscreen"}>
                        <MdInfo />
                        Must match the first password input field.
                    </p>
                    <button className='button' disabled={!validUser || !validPassword || !validPasswordMatch ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already registered?<br />
                    <span className="line">
                        <span onClick={handleSignInClick}>Sign In</span>
                    </span>
                </p>
            </div>
        </section>
    )
}

export default Signup
