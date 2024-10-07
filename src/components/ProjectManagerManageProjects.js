import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';

const fetchProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

const deleteProject = async (projectId) => {
  await api.delete(`/projects/${projectId}`);
};

const ProjectManagerManageProjects = () => {
  const queryClient = useQueryClient();
  const { data: projects, isLoading, error } = useQuery('projects', fetchProjects);

  const deleteMutation = useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
    },
  });

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      try {
        await deleteMutation.mutateAsync(projectId);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error al eliminar el proyecto');
      }
    }
  };

  if (isLoading) return <div>Cargando proyectos...</div>;
  if (error) return <div>Error al cargar los proyectos: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Proyectos</h2>
      {projects && projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map(project => (
            <li key={project.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-gray-600">{project.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-600 hover:text-red-800"
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? 'Eliminando...' : 'Eliminar Proyecto'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay proyectos disponibles.</p>
      )}
    </div>
  );
};

export default ProjectManagerManageProjects;