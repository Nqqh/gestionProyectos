/**import Link from 'next/link';
import { useQuery } from 'react-query';
import api from '../utils/api';

const fetchProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

const ProjectList = () => {
  const { data: projects, isLoading, error } = useQuery('projects', fetchProjects);

  if (isLoading) return <div>Cargando proyectos...</div>;
  if (error) return <div>Error al cargar los proyectos: {error.message}</div>;

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4">Tus Proyectos</h4>
      {projects.length === 0 ? (
        <p>No tienes proyectos aún.</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li key={project.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
              <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{project.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {project.status}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href="/projects/new" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Crear Nuevo Proyecto
      </Link>
    </div>
  );
};

export default ProjectList;**/
import Link from 'next/link';

const ProjectList = ({ projects }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Tus Proyectos</h4>
      {projects.length === 0 ? (
        <p>No tienes proyectos aún.</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li key={project.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
              <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{project.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {project.status}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href="/projects/new" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Crear Nuevo Proyecto
      </Link>
    </div>
  );
};

export default ProjectList;
