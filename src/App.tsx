import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Onboarding from './pages/onboarding';
import ForgotPassword from './pages/forgot-password';
import Login from './pages/login';
import SignUp from './pages/signup';
import { ThemeProvider } from './context/theme-context';
import styled from 'styled-components';

function App() {
  return (
    <ThemeProvider>
      <MainContainer>
        <Router>
          <Routes>
            <Route path='/' element={<Onboarding />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/*' element={<PrivateRoute />} />
          </Routes>
        </Router>
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled('main')`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background.primary};
`;

export default App;
