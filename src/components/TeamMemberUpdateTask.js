import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const TeamMemberUpdateTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/assigned');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}/status`, { status: newStatus });
      fetchTasks(); // Recargar las tareas después de la actualización
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Actualizar Estado de Tareas</h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <div className="mt-2">
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Progreso</option>
                <option value="completed">Completada</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberUpdateTask;