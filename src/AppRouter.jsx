import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import ProjectDetails from './ProjectDetails';

const AppRouter = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Check for current user on component mount and whenever session storage changes
        const checkCurrentUser = () => {
            const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
            setCurrentUser(storedUser);
        };

        // Initial check
        checkCurrentUser();

        // Add event listener for storage changes
        window.addEventListener('storage', checkCurrentUser);

        // Cleanup listener
        return () => {
            window.removeEventListener('storage', checkCurrentUser);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route 
                    path="/" 
                    element={currentUser ? <App /> : <Navigate to="/Login" replace />} 
                />
                <Route 
                    path="/project-details" 
                    element={currentUser ? <ProjectDetails /> : <Navigate to="/Login" replace />} 
                />
                {/* Redirigir cualquier ruta no válida */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;