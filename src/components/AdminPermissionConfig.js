import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminPermissionConfig = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.get('/admin/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/roles', newRole);
      setNewRole({ name: '', permissions: [] });
      fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleUpdateRolePermissions = async (roleId, permissions) => {
    try {
      await api.put(`/admin/roles/${roleId}/permissions`, { permissions });
      fetchRoles();
    } catch (error) {
      console.error('Error updating role permissions:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configuración de Permisos</h2>
      
      <form onSubmit={handleCreateRole} className="mb-8">
        <input
          type="text"
          value={newRole.name}
          onChange={(e) => setNewRole({...newRole, name: e.target.value})}
          placeholder="Nombre del Rol"
          required
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear Rol</button>
      </form>

      <ul>
        {roles.map(role => (
          <li key={role.id} className="mb-4 p-4 border rounded">
            <h3 className="font-bold">{role.name}</h3>
            <div>
              <h4>Permisos:</h4>
              <div className="flex flex-wrap">
                {['create_project', 'edit_project', 'delete_project', 'assign_tasks', 'view_reports'].map(permission => (
                  <label key={permission} className="mr-4">
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={(e) => {
                        const newPermissions = e.target.checked
                          ? [...role.permissions, permission]
                          : role.permissions.filter(p => p !== permission);
                        handleUpdateRolePermissions(role.id, newPermissions);
                      }}
                    />
                    {permission.replace('_', ' ')}
                  </label>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPermissionConfig;