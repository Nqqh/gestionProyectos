import Layout from '../src/components/Layout';
import { useAuth } from '../src/hooks/useAuth';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuth();  // Aquí podrías usar `user` si lo necesitas

  return (
    <Layout title="Inicio">
      <h1>Bienvenido al sistema de gestión de proyectos</h1>
      <p>Elige una de las siguientes opciones:</p>
      <ul>
        <li>
          <Link href="/projects">
            <a>Ver Proyectos</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a>Ir al Dashboard</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
