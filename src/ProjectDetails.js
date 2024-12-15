import React, { useState, useEffect } from 'react';

const ProjectDetails = () => {
    const [project, setProject] = useState(null);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [newObjective, setNewObjective] = useState('');
    const [progress, setProgress] = useState(0);
    const projectID = new URLSearchParams(window.location.search).get('id');

    useEffect(() => {
        loadProjectDetails();
        loadAvailableUsers();
    }, []);

    useEffect(() => {
        if (project && project.objectives) {
            updateProgress();
        }
    }, [project]);

    const loadProjectDetails = () => {
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const projectData = projects.find(p => p.id === projectID);
      

      if (projectData) {
          projectData.members = projectData.members || [];
          projectData.objectives = projectData.objectives || [];
      }
      
      setProject(projectData);
  };

    const loadAvailableUsers = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find(p => p.id === projectID);

    if (project) {
        const currentMembers = project.members || [];
        const availableUsers = users.filter(
            user => !currentMembers.includes(user.username)
        );
        setAvailableUsers(availableUsers);
        setSelectedUsers([]);
    }
    };

    const handleAddMember = () => {

      const uniqueSelectedUsers = selectedUsers.filter(user => 
          !project.members.includes(user)
      );
  
      if (uniqueSelectedUsers.length > 0) {
          const updatedMembers = [...project.members, ...uniqueSelectedUsers];
          updateProjectData({ ...project, members: updatedMembers });
      } else {
          alert('No hay usuarios nuevos para agregar');
      }
    };

    const handleRemoveMember = (username) => {
        const updatedMembers = project.members.filter(member => member !== username);
        updateProjectData({ ...project, members: updatedMembers });
    };

    const updateProjectData = (updatedProject) => {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const projectIndex = projects.findIndex(p => p.id === projectID);
        if (projectIndex !== -1) {
            projects[projectIndex] = updatedProject;
            localStorage.setItem('projects', JSON.stringify(projects));
            setProject(updatedProject);
            loadAvailableUsers();
        }
    };

    const handleAddObjective = () => {
        if (newObjective.trim()) {
            const updatedObjectives = [...project.objectives, newObjective];
            updateProjectData({ ...project, objectives: updatedObjectives });
            setNewObjective('');
        }
    };

    const handleRemoveObjective = (index) => {
      const updatedObjectives = [...project.objectives];
      const checkboxState = JSON.parse(localStorage.getItem(`project_${projectID}_checkboxes`) || '[]');
      
      const wasChecked = checkboxState[index];
  
      updatedObjectives.splice(index, 1);
      checkboxState.splice(index, 1);
      
      localStorage.setItem(`project_${projectID}_checkboxes`, JSON.stringify(checkboxState));
      
      updateProjectData({ ...project, objectives: updatedObjectives });
  

      if (wasChecked) {
          updateProgress();
      }
  };
  
  const updateProgress = () => {
      if (project && project.objectives && project.objectives.length > 0) {
          const totalObjectives = project.objectives.length;
          const checkboxState = JSON.parse(localStorage.getItem(`project_${projectID}_checkboxes`) || '[]');
          
          if (checkboxState.length === 0) {
              const initialCheckboxState = new Array(totalObjectives).fill(false);
              localStorage.setItem(`project_${projectID}_checkboxes`, JSON.stringify(initialCheckboxState));
          }
          
          const completedObjectives = checkboxState.filter(Boolean).length;
          const calculatedProgress = (completedObjectives / totalObjectives) * 100;
  
          setProgress(isNaN(calculatedProgress) ? 0 : calculatedProgress);
      } else {
          setProgress(0);
      }
  };
  

    const handleCheckboxChange = (index) => {
        const checkboxState = JSON.parse(localStorage.getItem(`project_${projectID}_checkboxes`) || '[]');
        checkboxState[index] = !checkboxState[index];
        localStorage.setItem(`project_${projectID}_checkboxes`, JSON.stringify(checkboxState));
        updateProgress();
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">Mis Proyectos</div>
            </nav>

            {project && (
                <div>
                    <h2 contentEditable="true">{project.title}</h2>
                    <p contentEditable="true">{project.content}</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}>
                            {Math.round(progress)}%
                        </div>
                    </div>

                    <h2>Objetivos:</h2>
                    <ul>
                        {project.objectives.map((objective, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={JSON.parse(localStorage.getItem(`project_${projectID}_checkboxes`) || '[]')[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    {objective}
                                </label>
                                <button onClick={() => handleRemoveObjective(index)}>×</button>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                        placeholder="Nuevo objetivo..."
                    />
                    <button onClick={handleAddObjective}>Agregar Objetivo</button>

                    <h2>Miembros del Proyecto</h2>
                    <div className="members-management">
                        <div className="members-list">
                            {project.members.map((member, index) => (
                                <div key={index}>
                                    <span>{member}</span>
                                    <button onClick={() => handleRemoveMember(member)}>×</button>
                                </div>
                            ))}
                        </div>
                        <div className="members-selector">
                            <select multiple onChange={(e) => setSelectedUsers(Array.from(e.target.selectedOptions).map(option => option.value))}>
                                {availableUsers.map((user, index) => (
                                    
                                    <option key={index} value={user.username}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleAddMember}>Agregar Miembro</button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={() => window.location.href = 'index.html'} className="return-index">
                Volver a la pagina Principal
            </button>
        </div>
    );
};

export default ProjectDetails;
