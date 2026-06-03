import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BookRide from './components/BookRide';
import History from './components/History';
import Profile from './components/Profile';

// to protect sensitive path
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = ()=> {
  return (
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace />} />
        <Route path='/login' element={<Login />} />

        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/book" element={<ProtectedRoute><BookRide/></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      </Routes>
  );
}

export default App;
