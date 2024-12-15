import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some((user) => user.username === username)) {
            alert('El nombre de usuario ya está en uso.');
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login'); // Redirige al login
    };

    return (
        <div className="container">
            <form onSubmit={handleRegister}>
                <h2>Gestor de Proyectos</h2>
                <h2>Registro de Usuario</h2>
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
                <div className="mini-container">
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
                <div className="registro">
                    <button type="button" onClick={() => navigate('/login')}>
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
