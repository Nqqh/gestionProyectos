/**import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAuth } from '../src/hooks/useAuth';
import Layout from '../src/components/Layout';
import api from '../src/utils/api';

const loginUser = async (credentials) => {
  const { data } = await api.post('/login', credentials);
  return data;
};

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      login(data.user, data.token);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Error de inicio de sesión:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  return (
    <Layout title="Iniciar Sesión">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder=""
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}**/

///////////////////////////////////////////////////////////////////////////////////
/**import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAuth } from '../src/hooks/useAuth';
import Layout from '../src/components/Layout';
import Link from 'next/link';  // Importar Link para el enlace de registro
import api from '../src/utils/api';

const loginUser = async (credentials) => {
  console.log('Credenciales enviadas:', credentials);  // Verificar los datos enviados

  const { data } = await api.post('/login', credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;  // Retorna los datos si la solicitud es exitosa
};

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');  // Manejar errores
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('Respuesta del servidor:', data);  // Verifica los datos devueltos por la API

      // Verificar que el token esté presente antes de guardarlo
      if (data.token) {
        // Verificar que estamos en el cliente antes de usar localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', data.token);
        }

        // Autenticación del usuario
        login(data.user, data.token);

        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        console.error('No se recibió el token en la respuesta');
        setErrorMessage('Error: no se recibió el token.');
      }
    },
    onError: (error) => {
      // Manejo del error, si la autenticación falla
      setErrorMessage('Credenciales incorrectas o solicitud mal formada.');
      console.error('Error de inicio de sesión:', error.response?.data || error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');  // Limpiar mensajes de error
    mutation.mutate(credentials);  // Enviar las credenciales al backend
  };

  return (
    <Layout title="Iniciar Sesión">
      <div className="max-w-md mx-auto mt-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">
              {errorMessage}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          ¿No tienes una cuenta? <Link href="/register" className="text-blue-500 hover:text-blue-800">Regístrate</Link>
        </p>
      </div>
    </Layout>
  );
}**/

/////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAuth } from '../src/hooks/useAuth';
import Layout from '../src/components/Layout';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation(
    async (credentials) => {
      return await login(credentials.email, credentials.password);
    },
    {
      onSuccess: () => {
        setErrorMessage('');
        router.push('/dashboard');
      },
      onError: (error) => {
        console.error('Login error:', error);
        setErrorMessage('Credenciales incorrectas');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    mutation.mutate({ email, password });
  };

  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          Don't have an account? Register
        </Link>
      </div>
    </Layout>
  );
}







