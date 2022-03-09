import React, { useEffect } from 'react'
import ModeButton from '../components/ModeButton'
import NavBar from '../components/NavBar'

const Home = () => {
  useEffect(() => {
    document.title = 'GreenRun Sports - Home';
  }, [])

  return (
    <>
        <ModeButton/>
        <NavBar/>
    </>
  )
}

export default Home