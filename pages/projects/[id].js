/**import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Layout from '../../src/components/Layout';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import TaskList from '../../src/components/TaskList';
import api from '../../src/utils/api';

const fetchProject = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: project, isLoading, error } = useQuery(['project', id], () => fetchProject(id), {
    enabled: !!id,
  });

  const deleteMutation = useMutation(() => deleteProject(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      router.push('/dashboard');
    },
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el proyecto: {error.message}</div>;

  return (
    <ProtectedRoute>
      <Layout title={project.name}>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Estado</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{project.status}</dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={() => router.push(`/projects/edit/${id}`)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
        <div className="mt-6">
          <TaskList projectId={id} tasks={project.tasks} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProjectDetail;**/

///////////////////////////////////////////////////////////////////

/**import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Layout from '../../src/components/Layout';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import TaskList from '../../src/components/TaskList';
import api from '../../src/utils/api';

const fetchProject = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: project, isLoading, error } = useQuery(['project', id], () => fetchProject(id), { enabled: !!id });

  const deleteMutation = useMutation(() => deleteProject(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      router.push('/dashboard');
    },
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el proyecto: {error.message}</div>;

  return (
    <ProtectedRoute>
      <Layout title={project.name}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <TaskList projectId={id} tasks={project.tasks} />
        <button onClick={handleDelete}>Eliminar Proyecto</button>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProjectDetail;**/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/hooks/useAuth';
import { projectService, taskService } from '../../src/services/api';
import Layout from '../../src/components/Layout';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isProjectManager } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });

  useEffect(() => {
    if (id) {
      fetchProject();
      fetchTasks();
    }
  }, [id]);

  const fetchProject = async () => {
    const response = await projectService.getById(id);
    setProject(response.data);
  };

  const fetchTasks = async () => {
    const response = await taskService.getAll(id);
    setTasks(response.data);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await taskService.create(id, newTask);
    setNewTask({ name: '', description: '' });
    fetchTasks();
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    await taskService.update(id, taskId, { status });
    fetchTasks();
  };

  if (!project) return <div>Loading...</div>;

  return (
    <Layout title={project.name}>
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p>{project.description}</p>
      
      {isProjectManager() && (
        <form onSubmit={handleCreateTask} className="mb-8">
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({...newTask, name: e.target.value})}
            placeholder="Task Name"
            required
          />
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            placeholder="Description"
            required
          />
          <button type="submit">Create Task</button>
        </form>
      )}

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-4">
            <span>{task.name} - {task.status}</span>
            <select
              value={task.status}
              onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

