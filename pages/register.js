import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { useAuth } from '../src/hooks/useAuth';
import Layout from '../src/components/Layout';
import api from '../src/utils/api';

const register = async (userData) => {
  const { data } = await api.post('/register', userData);
  return data;
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'team_member',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const mutation = useMutation(register, {
    onSuccess: (data) => {
      console.log('Registro exitoso', data);
      router.push('/login');
    },
    onError: (error) => {
      console.error('Error en el registro', error);
      setError(error.response?.data?.message || 'Error al registrar. Por favor, intente de nuevo.');
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    mutation.mutate(formData);
  };

  return (
    <Layout title="Registro">
      <div className="max-w-md mx-auto mt-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Rol
            </label>
            <select
              name="role"
              id="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="admin">Admin</option>
              <option value="project_manager">Project Manager</option>
              <option value="team_member">Team Member</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          ¿Ya tienes una cuenta? <Link href="/login" className="text-blue-500 hover:text-blue-800">Inicia sesión</Link>
        </p>
      </div>
    </Layout>
  );
}

/**const register = async (userData) => {
  const { data } = await api.post('/register', userData);
  return data;
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'team_member',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const mutation = useMutation(register, {
    onSuccess: (data) => {
      console.log('Registro exitoso', data);
      router.push('/login');
    },
    onError: (error) => {
      console.error('Error en el registro', error);
      setError(error.response?.data?.message || 'Error al registrar. Por favor, intente de nuevo.');
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    mutation.mutate(formData);
  };

  return (
    <Layout title="Register">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            id="role"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="admin">Admin</option>
            <option value="project_manager">Project Manager</option>
            <option value="team_member">Team Member</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Registrando...' : 'Register'}
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Already have an account? Log in
        </Link>
      </div>
    </Layout>
  );
}**/