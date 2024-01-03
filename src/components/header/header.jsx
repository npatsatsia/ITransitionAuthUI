import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Header = ({isManagementPage}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(logout())
        navigate('/signin')
    }
  return (
    <header style={{ display: isManagementPage ? 'block' : 'none' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top d-flex justify-content-between px-4 shadow">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 17V3h9.535a2.5 2.5 0 0 1 1.936.919l2.303 2.877A2.5 2.5 0 0 1 20.464 9H20" />
                        <path d="M6.5 17l-2.5 2.5V17" />
                    </svg>
                </div>
                <button
                    className="btn btn-dark"
                    onClick={handleLogOut}
                >
                    Logout
                </button>
            </nav>
        </header>
  )
}

export default Header
