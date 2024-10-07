/**import { projectService } from '../../src/services/projectService';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import ProtectedRoute from '../../src/components/ProtectedRoute';

const NewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = projectService.create({ name: projectName, description });
    console.log('Nuevo proyecto creado:', newProject);
    router.push('/projects');
  };

  return (
    <ProtectedRoute>
      <Layout title="Crear Nuevo Proyecto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Proyecto
          </button>
        </form>
      </Layout>
    </ProtectedRoute>
  );
};

export default NewProject;**/

import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import { useMutation, useQueryClient } from 'react-query';
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
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del Proyecto" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
          <button type="submit">Crear Proyecto</button>
        </form>
      </Layout>
    </ProtectedRoute>
  );
};

export default NewProject;
