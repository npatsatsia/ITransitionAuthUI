import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OutletMain from './outlet'
import Signin from '../components/Signin'
import Signup from '../components/SignUp/Signup'
import UserManagement from '../components/management/management'
import RequireAuth from '../components/RequireAuth/RequireAuth'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<OutletMain />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin/>}/>
            <Route element={<RequireAuth/>}>
                <Route path="/management" element={<UserManagement />}/>
            </Route>
        </Route>
    </Routes>
  )
}

export default Router
