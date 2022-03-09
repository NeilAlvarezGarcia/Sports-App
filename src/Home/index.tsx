import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'

const Index = () => {
  return (
    <Routes>
        <Route path='home' element={<Home/>}/>
        <Route path='history' element={<p>Hola mundo desde home</p>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='update-profile' element={<UpdateProfile/>}/>
    </Routes>
  )
}

export default Index