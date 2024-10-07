import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const ProjectManagerAssignTasks = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchTeamMembers();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await api.get('/users/team-members');
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/projects/${selectedProject}/tasks`, {
        name: taskName,
        description: taskDescription,
        assigneeId: assignee
      });
      alert('Tarea asignada con éxito');
      setTaskName('');
      setTaskDescription('');
      setAssignee('');
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Error al asignar la tarea');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Asignar Tareas</h2>
      <form onSubmit={handleAssignTask} className="space-y-4">
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">
            Proyecto
          </label>
          <select
            id="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Seleccionar Proyecto</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
            Nombre de la Tarea
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
            Descripción de la Tarea
          </label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
            Asignar a
          </label>
          <select
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Seleccionar Miembro del Equipo</option>
            {teamMembers.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Asignar Tarea
        </button>
      </form>
    </div>
  );
};

export default ProjectManagerAssignTasks;