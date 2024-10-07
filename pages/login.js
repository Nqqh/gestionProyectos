import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/hooks/useAuth';
import Layout from '../src/components/Layout';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout title="Iniciar sesión">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder="Correo"
          required
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </Layout>
  );
}
