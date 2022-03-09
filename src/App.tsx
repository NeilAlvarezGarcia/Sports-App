import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './auth/Login';
import OnBoarding from './auth/OnBoarding';
import SignUp from './auth/SignUp';
import { Container } from './components/Container';
import { UseContext } from './contextApi/ContextApi';
import ForgotPassword from './auth/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const {mode} = UseContext();

  return (
    <Container mode={mode}>
      <Router>
        <Routes>
            <Route path='/' element={<OnBoarding/>}/>
            <Route path='/*' element={<PrivateRoute/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
