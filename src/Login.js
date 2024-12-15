import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
        if (rememberedUser) {
            setUsername(rememberedUser.username);
            setPassword(rememberedUser.password);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify({ username }));
            if (rememberMe) {
                localStorage.setItem('rememberedUser', JSON.stringify({ username, password }));
            } else {
                localStorage.removeItem('rememberedUser');
            }
            navigate('/');
        } else {
            alert('Nombre de usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Gestor de Proyectos</h2>
                <h2>Iniciar Sesión</h2>
                <div className="mini-container">
                    <label>Nombre de usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mini-container">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
                <div className="remember-me">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label>Recuérdame</label>
                </div>
                <div className="registro">
                <button type="button" onClick={() => navigate('/register')}>
                ¿No tienes una cuenta? Regístrate
                </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
