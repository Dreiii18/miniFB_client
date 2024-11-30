import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Reset from './pages/Reset';

function PrivateRoute({ children }) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? children : <Navigate to='/login' />;
}

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route 
                        path='/'
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/reset' element={<Reset />} />
                </Routes>
            </Router>
        </>
    )
}

export default App