import { useState, useEffect } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import { projectService } from '../../src/services/projectService';
import Layout from '../../src/components/Layout';
import Link from 'next/link';

export default function Projects() {
  const { isProjectManager } = useAuth();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectService.create(newProject);
      setNewProject({ name: '', description: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await projectService.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Layout title="Projects">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {isProjectManager() && (
        <form onSubmit={handleCreateProject} className="mb-8">
          <input
            type="text"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            placeholder="Project Name"
            required
            className="border p-2 rounded mb-2"
          />
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            placeholder="Description"
            required
            className="border p-2 rounded mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Project
          </button>
        </form>
      )}

      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4">
            <Link href={`/projects/${project.id}`}>
              <a className="text-blue-500">{project.name}</a>
            </Link>
            {isProjectManager() && (
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="ml-4 bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
