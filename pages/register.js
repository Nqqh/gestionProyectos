import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import api from '../src/utils/api';

export default function Register() {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: 'team_member' });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', userData);
      router.push('/login');
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
  };

  return (
    <Layout title="Registro">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Correo"
          required
        />
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          placeholder="Contraseña"
          required
        />
        <select
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="project_manager">Project Manager</option>
          <option value="team_member">Team Member</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </Layout>
  );
}
