import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
    const navigate = useNavigate();
    
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem('projects');
        return savedProjects ? JSON.parse(savedProjects) : [];

    });
    const [projectCount, setProjectCount] = useState(() => {
        return parseInt(localStorage.getItem('projectCount') || '1');
    });
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || { username: 'Invitado' };

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
        localStorage.setItem('projectCount', projectCount.toString());
    }, [projects, projectCount]);

   

    const addNewProject = () => {
        const title = prompt('Ingrese el título para el nuevo Proyecto:', `Proyecto ${projectCount + 1}`);
        const content = prompt('Ingrese una breve descripción para el nuevo Proyecto:', 'Breve descripción');
    
        if (title && content) {
            const newProject = {
                id: `Proyecto-${projectCount + 1}`,
                title,
                content,
                objectives: [], 
                members: [],   
                creator: currentUser.username,
            };
    
            setProjects([...projects, newProject]);
            setProjectCount(projectCount + 1);
        }
    };

    const deleteProject = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    const handleProjectClick = (id) => {
        navigate(`/project-details?id=${id}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        navigate('/login');
    };
    

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">Gestor de Mis Proyectos</div>
                <div className="navbar-menu">
                    <button onClick={addNewProject} className="navbar-item btn-add">Añadir Proyecto</button>
                    <button onClick={handleLogout} className="navbar-item btn-logout">Cerrar Sesión</button>
                </div>
            </nav>

            <div className="grid-container">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="grid-item"
                        onClick={() => handleProjectClick(project.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className="project-title">{project.title}</h3>
                        <p>{project.content}</p>
                        <p class="project-creator">Creado por: {project.creator}</p>
                        <button className="delete-btn" onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                        }}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
