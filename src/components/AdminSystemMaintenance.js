import React, { useState } from 'react';
import api from '../utils/api';

const AdminSystemMaintenance = () => {
  const [backupStatus, setBackupStatus] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');

  const performBackup = async () => {
    try {
      const response = await api.post('/admin/system/backup');
      setBackupStatus('Backup realizado con éxito');
    } catch (error) {
      setBackupStatus('Error al realizar el backup');
      console.error('Error performing backup:', error);
    }
  };

  const performUpdate = async () => {
    try {
      const response = await api.post('/admin/system/update');
      setUpdateStatus('Sistema actualizado con éxito');
    } catch (error) {
      setUpdateStatus('Error al actualizar el sistema');
      console.error('Error performing update:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mantenimiento del Sistema</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Backup del Sistema</h3>
        <button onClick={performBackup} className="bg-blue-500 text-white p-2 rounded">Realizar Backup</button>
        {backupStatus && <p className="mt-2">{backupStatus}</p>}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Actualización del Sistema</h3>
        <button onClick={performUpdate} className="bg-green-500 text-white p-2 rounded">Actualizar Sistema</button>
        {updateStatus && <p className="mt-2">{updateStatus}</p>}
      </div>
    </div>
  );
};

export default AdminSystemMaintenance;