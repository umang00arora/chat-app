import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import './styles/main.scss';
import {Routes , Route} from 'react-router';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/index';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import { Col } from 'rsuite';
import Chat from './pages/Home/Chat';
function App() {
  return (
    <ProfileProvider>
    <Routes>
      <Route path='/signin' element={
        <PublicRoute>
          <SignIn/>
        </PublicRoute>
      }/>
      <Route path='/' element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
      }>
        <Route exct path="/chat/:chatId" element={
            <Col>
            <Chat/>
            </Col>
          }/>
      </Route>
    </Routes>
    </ProfileProvider>
  );
}

export default App;
