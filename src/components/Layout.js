/**import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Layout = ({ children, title = 'Gestión de Proyectos' }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Sistema de gestión de proyectos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <nav>
              <Link href="/" className="text-indigo-600 hover:text-indigo-500 mr-4">
                Inicio
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cerrar Sesión
                </button>
              )}
            </nav>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;**/

// src/components/Layout.js
// src/components/Layout.js
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Layout({ children, title = 'Default title' }) {
  const { user, logout, isAdmin, isProjectManager, isTeamMember } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center text-gray-700 hover:text-gray-900 mr-6">
                Inicio
              </Link>
              {user && (
                <>
                  {isAdmin() && (
                    <Link href="/admin/manage-users" className="text-gray-700 hover:text-gray-900 mr-6">
                      
                    </Link>
                  )}
                  {isProjectManager() && (
                    <Link href="/project-manager/create-project" className="text-gray-700 hover:text-gray-900 mr-6">
                      
                    </Link>
                  )}
                  {isTeamMember() && (
                    <Link href="/team-member/tasks" className="text-gray-700 hover:text-gray-900 mr-6">
                      
                    </Link>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center">
                  <span className="text-gray-700 mr-4">Bienvenid@, {user.name}</span>
                  <button
                    onClick={logout}
                    className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Cerrar sesion
                  </button>
                </div>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                  Iniciar sesion
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}