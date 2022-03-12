import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import History from './History'
import Home from './Home'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import List from './List'

const Index = () => {
  return (
    <Routes>
        <Route path='home' element={<Home/>}/>
        <Route path='history' element={<History/>}/>
        <Route path='list' element={<List/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='update-profile' element={<RenderUpdateProfile/>}/>
    </Routes>
  )
}

const RenderUpdateProfile = () => window.innerWidth < 756 ? <UpdateProfile/> : <Navigate to='/profile'/>

export default Index