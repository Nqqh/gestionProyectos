import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'team_member' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', newUser);
      setNewUser({ name: '', email: '', password: '', role: 'team_member' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      
      <form onSubmit={handleCreateUser} className="mb-8">
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          placeholder="Nombre"
          required
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          placeholder="Email"
          required
          className="mr-2 p-2 border rounded"
        />
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          placeholder="Contraseña"
          required
          className="mr-2 p-2 border rounded"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
          className="mr-2 p-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="project_manager">Project Manager</option>
          <option value="team_member">Team Member</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear Usuario</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-4 p-4 border rounded">
            {editingUser && editingUser.id === user.id ? (
              <form onSubmit={handleUpdateUser}>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="mr-2 p-2 border rounded"
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="mr-2 p-2 border rounded"
                />
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="mr-2 p-2 border rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="project_manager">Project Manager</option>
                  <option value="team_member">Team Member</option>
                </select>
                <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">Guardar</button>
                <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white p-2 rounded">Cancelar</button>
              </form>
            ) : (
              <>
                <span>{user.name} - {user.email} - {user.role}</span>
                <button onClick={() => setEditingUser(user)} className="bg-yellow-500 text-white p-2 rounded ml-2">Editar</button>
                <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-2 rounded ml-2">Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserManagement;