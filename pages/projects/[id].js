import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/hooks/useAuth';
import { projectService, taskService } from '../../src/services/projectService';
import Layout from '../../src/components/Layout';
import api from '../../src/utils/api'; // Ruta corregida

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
