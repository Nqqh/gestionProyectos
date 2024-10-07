/**import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Comments from './Comments';
import api from '../utils/api';

const createTask = async ({ projectId, taskData }) => {
  const { data } = await api.post(`/projects/${projectId}/tasks`, taskData);
  return data;
};

const updateTask = async ({ projectId, taskId, taskData }) => {
  const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, taskData);
  return data;
};

const deleteTask = async ({ projectId, taskId }) => {
  await api.delete(`/projects/${projectId}/tasks/${taskId}`);
};

export default function TaskList({ projectId, tasks }) {
  const [newTaskName, setNewTaskName] = useState('');
  const queryClient = useQueryClient();

  const createMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['project', projectId]);
      setNewTaskName('');
    },
  });

  const updateMutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['project', projectId]);
    },
  });

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['project', projectId]);
    },
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    createMutation.mutate({ projectId, taskData: { name: newTaskName } });
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    updateMutation.mutate({ projectId, taskId, taskData: { status: newStatus } });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate({ projectId, taskId });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
      <ul className="mt-3 space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between bg-white shadow-sm rounded-md p-3">
            <div className="flex-1">
              <span>{task.name}</span>
              <Comments projectId={projectId} taskId={task.id} comments={task.comments} />
            </div>
            <div>
              <select
                value={task.status}
                onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                className="mr-2 rounded-md border-gray-300"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateTask} className="mt-4">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="New task name"
          className="rounded-md border-gray-300 mr-2"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}**/

import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';

const createTask = async ({ projectId, taskData }) => {
  const { data } = await api.post(`/projects/${projectId}/tasks`, taskData);
  return data;
};

const TaskList = ({ projectId, tasks }) => {
  const [newTask, setNewTask] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['project', projectId]);
      setNewTask('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ projectId, taskData: { name: newTask } });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Nueva tarea" />
        <button type="submit">Agregar Tarea</button>
      </form>
    </div>
  );
};

export default TaskList;

