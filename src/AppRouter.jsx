import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import ProjectDetails from './ProjectDetails';

const AppRouter = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/" 
                    element={currentUser ? <App /> : <Navigate to="/login" replace />} 
                />
                <Route 
                    path="/project-details" 
                    element={currentUser ? <ProjectDetails /> : <Navigate to="/login" replace />} 
                />
                {/* Redirigir cualquier ruta no válida */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
