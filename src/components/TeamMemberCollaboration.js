import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const TeamMemberCollaboration = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      await api.post(`/projects/${selectedProject}/messages`, { content: message });
      setMessage('');
      // Aquí podrías actualizar la lista de mensajes si la estuvieras mostrando
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Colaboración en Equipo</h2>
      <div className="mb-4">
        <label htmlFor="project-select" className="block text-sm font-medium text-gray-700">
          Seleccionar Proyecto
        </label>
        <select
          id="project-select"
          value={selectedProject || ''}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={sendMessage} className="mt-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          disabled={!selectedProject}
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default TeamMemberCollaboration;