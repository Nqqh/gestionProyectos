import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const TeamMemberTasks = () => {
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tareas Asignadas</h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">Estado: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberTasks;