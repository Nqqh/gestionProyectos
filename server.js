/**const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();

// Configuración de EJS para renderizado de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true
}));

const users = [];
const projects = [];
const tasks = [];
const comments = [];
const SECRET_KEY = 'tu_clave_secreta'; // En producción, usa una variable de entorno

// Función helper para generar IDs únicos
const generateId = () => Math.random().toString(36).substr(2, 9);

// Middleware de autenticación con JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware para autenticación de sesión
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Gestión de Proyectos' });
});

// Rutas de autenticación y registro
app.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }

  const newUser = { id: generateId(), name, email, password, role };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    req.session.userId = user.id;
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(400).json({ message: 'Credenciales inválidas' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Rutas de usuario
app.get('/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// Ruta de dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    projectCount: projects.length,
    taskCount: tasks.length,
    completedTaskCount: tasks.filter(t => t.status === 'completed').length
  });
});

// Rutas de vistas protegidas
app.get('/dashboard-view', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  if (user) {
    res.render('dashboard', { user, projects });
  } else {
    res.redirect('/login');
  }
});

app.get('/view/projects', requireAuth, (req, res) => {
  res.render('projects', { projects });
});

app.get('/view/task/:id', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.render('project', { project });
  } else {
    res.status(404).send('Proyecto no encontrado');
  }
});

// Rutas de proyectos
app.get('/projects', requireAuth, (req, res) => {
  res.json(projects);
});

app.post('/projects', requireAuth, (req, res) => {
  const { name, description } = req.body;
  const newProject = { id: generateId(), name, description, tasks: [] };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.get('/projects/:id', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.put('/projects/:id', requireAuth, (req, res) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...req.body };
    res.json(projects[index]);
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.delete('/projects/:id', requireAuth, (req, res) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    projects.splice(index, 1);
    res.json({ message: 'Proyecto eliminado correctamente' });
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

// Rutas de tareas dentro de proyectos
app.post('/projects/:projectId/tasks', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const newTask = { id: generateId(), ...req.body, status: 'todo' };
    project.tasks.push(newTask);
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.put('/projects/:projectId/tasks/:taskId', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const taskIndex = project.tasks.findIndex(t => t.id === req.params.taskId);
    if (taskIndex !== -1) {
      project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...req.body };
      res.json(project.tasks[taskIndex]);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.delete('/projects/:projectId/tasks/:taskId', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const taskIndex = project.tasks.findIndex(t => t.id === req.params.taskId);
    if (taskIndex !== -1) {
      project.tasks.splice(taskIndex, 1);
      res.json({ message: 'Tarea eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

// Rutas de comentarios en tareas
app.post('/projects/:projectId/tasks/:taskId/comments', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === req.params.taskId);
    if (task) {
      const newComment = { id: generateId(), ...req.body, createdAt: new Date() };
      if (!task.comments) task.comments = [];
      task.comments.push(newComment);
      comments.push(newComment);
      res.status(201).json(newComment);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));**/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();

// Configuración de EJS para renderizado de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true
}));

const users = [];
const projects = [];
const tasks = [];
const comments = [];
const roles = [
  { id: 'admin', name: 'Administrador', permissions: ['manage_users', 'manage_roles', 'manage_system'] },
  { id: 'project_manager', name: 'Gerente de Proyectos', permissions: ['manage_projects', 'assign_tasks'] },
  { id: 'team_member', name: 'Miembro del Equipo', permissions: ['view_projects', 'update_tasks'] }
];
const SECRET_KEY = 'tu_clave_secreta'; // En producción, usa una variable de entorno

// Función helper para generar IDs únicos
const generateId = () => Math.random().toString(36).substr(2, 9);

// Middleware de autenticación con JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware para autenticación de sesión
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Middleware para verificar permisos de administrador
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
}

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Gestión de Proyectos' });
});

// Rutas de autenticación y registro
app.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }

  const newUser = { id: generateId(), name, email, password, role };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    req.session.userId = user.id;
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(400).json({ message: 'Credenciales inválidas' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Rutas de usuario
app.get('/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// Ruta de dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    projectCount: projects.length,
    taskCount: tasks.length,
    completedTaskCount: tasks.filter(t => t.status === 'completed').length
  });
});

// Rutas de vistas protegidas
app.get('/dashboard-view', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  if (user) {
    res.render('dashboard', { user, projects });
  } else {
    res.redirect('/login');
  }
});

app.get('/view/projects', requireAuth, (req, res) => {
  res.render('projects', { projects });
});

app.get('/view/task/:id', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.render('project', { project });
  } else {
    res.status(404).send('Proyecto no encontrado');
  }
});

// Rutas de proyectos
app.get('/projects', requireAuth, (req, res) => {
  res.json(projects);
});

app.post('/projects', authenticateToken, (req, res) => {
  console.log('Intento de crear proyecto:', req.body);
  console.log('Usuario:', req.user);
  
  if (req.user.role !== 'project_manager') {
    console.log('Permiso denegado para crear proyecto');
    return res.status(403).json({ message: 'No tienes permiso para crear proyectos' });
  }
  
  const { name, description } = req.body;
  const newProject = { id: generateId(), name, description, tasks: [] };
  projects.push(newProject);
  console.log('Proyecto creado:', newProject);
  res.status(201).json(newProject);
});

app.get('/projects/:id', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.put('/projects/:id', requireAuth, (req, res) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...req.body };
    res.json(projects[index]);
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.delete('/projects/:id', requireAuth, (req, res) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    projects.splice(index, 1);
    res.json({ message: 'Proyecto eliminado correctamente' });
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

// Rutas de tareas dentro de proyectos
app.post('/projects/:projectId/tasks', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const newTask = { id: generateId(), ...req.body, status: 'todo' };
    project.tasks.push(newTask);
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.put('/projects/:projectId/tasks/:taskId', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const taskIndex = project.tasks.findIndex(t => t.id === req.params.taskId);
    if (taskIndex !== -1) {
      project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...req.body };
      res.json(project.tasks[taskIndex]);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

app.delete('/projects/:projectId/tasks/:taskId', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const taskIndex = project.tasks.findIndex(t => t.id === req.params.taskId);
    if (taskIndex !== -1) {
      project.tasks.splice(taskIndex, 1);
      res.json({ message: 'Tarea eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

// Rutas de comentarios en tareas
app.post('/projects/:projectId/tasks/:taskId/comments', requireAuth, (req, res) => {
  const project = projects.find(p => p.id === req.params.projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === req.params.taskId);
    if (task) {
      const newComment = { id: generateId(), ...req.body, createdAt: new Date() };
      if (!task.comments) task.comments = [];
      task.comments.push(newComment);
      comments.push(newComment);
      res.status(201).json(newComment);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } else {
    res.status(404).json({ message: 'Proyecto no encontrado' });
  }
});

// Nuevas rutas para funciones de administrador
app.get('/admin/users', authenticateToken, requireAdmin, (req, res) => {
  res.json(users.map(({ password, ...user }) => user));
});

app.post('/admin/users', authenticateToken, requireAdmin, (req, res) => {
  const { name, email, password, role } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }
  const newUser = { id: generateId(), name, email, password, role };
  users.push(newUser);
  res.status(201).json({ message: 'Usuario creado con éxito', user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

app.put('/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  users[userIndex] = { ...users[userIndex], name, email, role };
  res.json({ message: 'Usuario actualizado con éxito', user: { id: users[userIndex].id, name: users[userIndex].name, email: users[userIndex].email, role: users[userIndex].role } });
});

app.delete('/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado con éxito' });
});

app.get('/admin/roles', authenticateToken, requireAdmin, (req, res) => {
  res.json(roles);
});

app.post('/admin/roles', authenticateToken, requireAdmin, (req, res) => {
  const { name, permissions } = req.body;
  const newRole = { id: generateId(), name, permissions };
  roles.push(newRole);
  res.status(201).json({ message: 'Rol creado con éxito', role: newRole });
});

app.put('/admin/roles/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  const roleIndex = roles.findIndex(role => role.id === id);
  if (roleIndex === -1) {
    return res.status(404).json({ message: 'Rol no encontrado' });
  }
  roles[roleIndex] = { ...roles[roleIndex], name, permissions };
  res.json({ message: 'Rol actualizado con éxito', role: roles[roleIndex] });
});

app.delete('/admin/roles/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const roleIndex = roles.findIndex(role => role.id === id);
  if (roleIndex === -1) {
    return res.status(404).json({ message: 'Rol no encontrado' });
  }
  roles.splice(roleIndex, 1);
  res.json({ message: 'Rol eliminado con éxito' });
});

app.post('/admin/system/backup', authenticateToken, requireAdmin, (req, res) => {
  // Aquí implementarías la lógica real para realizar un backup del sistema
  res.json({ message: 'Backup del sistema realizado con éxito' });
});

app.post('/admin/system/update', authenticateToken, requireAdmin, (req, res) => {
  // Aquí implementarías la lógica real para actualizar el sistema
  res.json({ message: 'Sistema actualizado con éxito' });
});

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
