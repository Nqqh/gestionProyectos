import React, { useState } from 'react';
import api from '../utils/api';

const ProjectManagerCreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', { name: projectName, description: projectDescription }); // Eliminada la variable 'response'
      alert('Proyecto creado con éxito');
      setProjectName('');
      setProjectDescription('');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error al crear el proyecto');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Proyecto</h2>
      <form onSubmit={handleCreateProject} className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
            Nombre del Proyecto
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
            Descripción del Proyecto
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Proyecto
        </button>
      </form>
    </div>
  );
};

export default ProjectManagerCreateProject;
