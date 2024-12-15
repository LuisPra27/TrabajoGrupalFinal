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
