const STORAGE_KEY = 'projects';

export const projectService = {
  getAll: () => {
    const projects = localStorage.getItem(STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  },

  getById: (id) => {
    const projects = projectService.getAll();
    return projects.find(p => p.id === id);
  },

  create: (project) => {
    const projects = projectService.getAll();
    const newProject = { ...project, id: Date.now(), status: 'En progreso' };
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return newProject;
  },

  update: (id, updatedProject) => {
    let projects = projectService.getAll();
    projects = projects.map(p => p.id === id ? {...p, ...updatedProject} : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return projects.find(p => p.id === id);
  },

  delete: (id) => {
    let projects = projectService.getAll();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
};