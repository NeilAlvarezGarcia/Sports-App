import React from 'react'
import { Navigate } from 'react-router-dom';
import { UseContext } from '../contextApi/ContextApi';
import Index from '../Home/index';

const PrivateRoute = () => {
  const {user} = UseContext();


    return (
        user ? <Index/> : <Navigate to='/'/>
    );
}

export default PrivateRoute