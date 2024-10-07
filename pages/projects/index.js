/**import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import Layout from '../../src/components/Layout';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import api from '../../src/utils/api';

const createProject = async (projectData) => {
  const { data } = await api.post('/projects', projectData);
  return data;
};

const NewProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      router.push('/dashboard');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, description });
  };

  return (
    <ProtectedRoute>
      <Layout title="Crear Nuevo Proyecto">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Creando...' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </Layout>
    </ProtectedRoute>
  );
};

export default NewProject;**/

import { useState, useEffect } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import { projectService } from '../../src/services/projectService';
import Layout from '../../src/components/Layout';
import Link from 'next/link';

export default function Projects() {
  const { user, isProjectManager } = useAuth();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await projectService.getAll();
    setProjects(response.data);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    await projectService.create(newProject);
    setNewProject({ name: '', description: '' });
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    await projectService.delete(id);
    fetchProjects();
  };

  return (
    <Layout title="Projects">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      
      {isProjectManager() && (
        <form onSubmit={handleCreateProject} className="mb-8">
          <input
            type="text"
            value={newProject.name}
            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            placeholder="Project Name"
            required
          />
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            placeholder="Description"
            required
          />
          <button type="submit">Create Project</button>
        </form>
      )}

      <ul>
        {projects.map(project => (
          <li key={project.id} className="mb-4">
            <Link href={`/projects/${project.id}`}>
              <span>{project.name}</span>
            </Link>
            {isProjectManager() && (
              <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}