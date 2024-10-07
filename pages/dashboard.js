
// pages/dashboard.js
/**import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import { useAuth } from '../src/hooks/useAuth';
import AdminUserManagement from '../src/components/AdminUserManagement';
import AdminPermissionConfig from '../src/components/AdminPermissionConfig';
import AdminSystemMaintenance from '../src/components/AdminSystemMaintenance';

export default function Dashboard() {
  const { user, isAdmin, isProjectManager, isTeamMember } = useAuth();
  const router = useRouter();
  const [activeAdminTab, setActiveAdminTab] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderAdminContent = () => {
    switch (activeAdminTab) {
      case 'users':
        return <AdminUserManagement />;
      case 'permissions':
        return <AdminPermissionConfig />;
      case 'maintenance':
        return <AdminSystemMaintenance />;
      default:
        return null;
    }
  };

  return (
    <Layout title="Dashboard">
      <h1 className="text-2xl font-bold mb-4">Bienvenid@, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isAdmin() && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Administrador</h2>
            <ul className="list-disc list-inside">
              <li>
                <button 
                  onClick={() => setActiveAdminTab('users')}
                  className="text-blue-600 hover:underline"
                >
                  Gestión de usuarios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveAdminTab('permissions')}
                  className="text-blue-600 hover:underline"
                >
                  Configuración de permisos a usuarios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveAdminTab('maintenance')}
                  className="text-blue-600 hover:underline"
                >
                  Mantenimiento del sistema
                </button>
              </li>
            </ul>
          </div>
        )}
        {isProjectManager() && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Gerente de proyecto</h2>
            <ul className="list-disc list-inside">
              <li>Crear Proyectos</li>
              <li>Gestión de Proyectos</li>
              <li>Asignar tareas</li>
            </ul>
          </div>
        )}
        {isTeamMember() && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Miembro del equipo</h2>
            <ul className="list-disc list-inside">
              <li>Ver tareas asignadas</li>
              <li>Actualizar estado de tareas</li>
              <li>Colaborar con otros miembros del equipo</li>
            </ul>
          </div>
        )}
      </div>
      {activeAdminTab && (
        <div className="mt-8">
          {renderAdminContent()}
        </div>
      )}
    </Layout>
  );
}**/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import { useAuth } from '../src/hooks/useAuth';
import AdminUserManagement from '../src/components/AdminUserManagement';
import AdminPermissionConfig from '../src/components/AdminPermissionConfig';
import AdminSystemMaintenance from '../src/components/AdminSystemMaintenance';
import TeamMemberTasks from '../src/components/TeamMemberTasks';
import TeamMemberUpdateTask from '../src/components/TeamMemberUpdateTask';
import TeamMemberCollaboration from '../src/components/TeamMemberCollaboration';
import ProjectManagerCreateProject from '../src/components/ProjectManagerCreateProject';
import ProjectManagerManageProjects from '../src/components/ProjectManagerManageProjects';
import ProjectManagerAssignTasks from '../src/components/ProjectManagerAssignTasks';

export default function Dashboard() {
  const { user, isAdmin, isProjectManager, isTeamMember } = useAuth();
  const router = useRouter();
  const [activeAdminTab, setActiveAdminTab] = useState(null);
  const [activeTeamMemberTab, setActiveTeamMemberTab] = useState(null);
  const [activeProjectManagerTab, setActiveProjectManagerTab] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderAdminContent = () => {
    switch (activeAdminTab) {
      case 'users':
        return <AdminUserManagement />;
      case 'permissions':
        return <AdminPermissionConfig />;
      case 'maintenance':
        return <AdminSystemMaintenance />;
      default:
        return null;
    }
  };

  const renderTeamMemberContent = () => {
    switch (activeTeamMemberTab) {
      case 'tasks':
        return <TeamMemberTasks />;
      case 'updateTask':
        return <TeamMemberUpdateTask />;
      case 'collaborate':
        return <TeamMemberCollaboration />;
      default:
        return null;
    }
  };

  const renderProjectManagerContent = () => {
    switch (activeProjectManagerTab) {
      case 'createProject':
        return <ProjectManagerCreateProject />;
      case 'manageProjects':
        return <ProjectManagerManageProjects />;
      case 'assignTasks':
        return <ProjectManagerAssignTasks />;
      default:
        return null;
    }
  };

  return (
    <Layout title="Dashboard">
      <h1 className="text-2xl font-bold mb-4">Bienvenid@, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isAdmin() && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Administrador</h2>
            <ul className="list-disc list-inside">
              <li>
                <button 
                  onClick={() => setActiveAdminTab('users')}
                  className="text-blue-600 hover:underline"
                >
                  Gestión de usuarios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveAdminTab('permissions')}
                  className="text-blue-600 hover:underline"
                >
                  Configuración de permisos a usuarios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveAdminTab('maintenance')}
                  className="text-blue-600 hover:underline"
                >
                  Mantenimiento del sistema
                </button>
              </li>
            </ul>
          </div>
        )}
        {isProjectManager() && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Gerente de proyecto</h2>
            <ul className="list-disc list-inside">
              <li>
                <button 
                  onClick={() => setActiveProjectManagerTab('createProject')}
                  className="text-blue-600 hover:underline"
                >
                  Crear Proyectos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveProjectManagerTab('manageProjects')}
                  className="text-blue-600 hover:underline"
                >
                  Gestión de Proyectos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveProjectManagerTab('assignTasks')}
                  className="text-blue-600 hover:underline"
                >
                  Asignar tareas
                </button>
              </li>
            </ul>
          </div>
        )}
        {isTeamMember() && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Miembro del equipo</h2>
            <ul className="list-disc list-inside">
              <li>
                <button 
                  onClick={() => setActiveTeamMemberTab('tasks')}
                  className="text-blue-600 hover:underline"
                >
                  Ver tareas asignadas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTeamMemberTab('updateTask')}
                  className="text-blue-600 hover:underline"
                >
                  Actualizar estado de tareas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTeamMemberTab('collaborate')}
                  className="text-blue-600 hover:underline"
                >
                  Colaborar con otros miembros del equipo
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {activeAdminTab && (
        <div className="mt-8">
          {renderAdminContent()}
        </div>
      )}
      {activeTeamMemberTab && (
        <div className="mt-8">
          {renderTeamMemberContent()}
        </div>
      )}
      {activeProjectManagerTab && (
        <div className="mt-8">
          {renderProjectManagerContent()}
        </div>
      )}
    </Layout>
  );
}
