/**import { useState, useEffect } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import { userService } from '../../src/services/api';
import Layout from '../../src/components/Layout';

export default function ManageUsers() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'team_member' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await userService.getAll();
    setUsers(response.data);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await userService.create(newUser);
    setNewUser({ name: '', email: '', role: 'team_member' });
    fetchUsers();
  };

  const handleUpdateUser = async (id, userData) => {
    await userService.update(id, userData);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await userService.delete(id);
    fetchUsers();
  };

  if (!isAdmin()) {
    return <div>Access Denied</div>;
  }

  return (
    <Layout title="Manage Users">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      
      <form onSubmit={handleCreateUser} className="mb-8">
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          placeholder="Email"
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
        >
          <option value="admin">Admin</option>
          <option value="project_manager">Project Manager</option>
          <option value="team_member">Team Member</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-4">
            <span>{user.name} - {user.email} - {user.role}</span>
            <button onClick={() => handleUpdateUser(user.id, {...user, role: 'admin'})}>
              Make Admin
            </button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}**/
import { useState, useEffect } from 'react';
import Layout from '../../src/components/Layout';
import { useAuth } from '../../src/hooks/useAuth';
import api from '../../src/utils/api';

export default function ManageUsers() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'team_member' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (isAdmin()) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', newUser);
      setNewUser({ name: '', email: '', role: 'team_member' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editingUser.id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await api.delete(`/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (!isAdmin()) return <div>Acceso denegado</div>;

  return (
    <Layout title="Gestión de Usuarios">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      
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
    </Layout>
  );
}