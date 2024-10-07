import Layout from '../src/components/Layout';
//import Layout from './Layout';
//import Layout from '@/components/Layout';
import Link from 'next/link';
import { useAuth } from '../src/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout title="Bienvenido">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Bienvenido a tu Sistema de Gestión de Proyectos
          </h1>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Link href="/login" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Iniciar Sesión &rarr;</h3>
              <p className="mt-4 text-xl">
                Accede a tu cuenta para gestionar tus proyectos.
              </p>
            </Link>

            <Link href="/register" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Registrarse &rarr;</h3>
              <p className="mt-4 text-xl">
                Crea una nueva cuenta para empezar a usar el sistema.
              </p>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}
