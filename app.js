const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const i18n = require('i18n');
const { expressjwt } = require('express-jwt');

const jwtKey = config.get('secret.key');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boards');
const cardsRouter = require('./routes/cards');
const columnsRouter = require('./routes/columns');
const developersRouter = require('./routes/developers');
const permissionsRouter = require('./routes/permissions');
const projectRolesRouter = require('./routes/projectRoles');
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const socialNetworksRouter = require('./routes/socialNetworks');
const sprintsRouter = require('./routes/sprints');

const app = express();

// Conexión a MongoDB Atlas
const dbURI = config.get('mongodb.uri');
mongoose.connect(dbURI)
    .then(() => console.log('Conexión a MongoDB Atlas establecida correctamente'))
    .catch(err => console.error('No se ha podido establecer la conexión a la base de datos.', err));

// Conexión a MongoDB
/*const url = "mongodb://localhost:27017/manejador-de-proyectos";
mongoose.connect(url);
const db = mongoose.connection;

db.on('open', () => {
  console.log("Conexión a la base de datos establecida correctamente.");
});

db.on('error', () => {
  console.log("No se ha podido establecer la conexión a la base de datos.");
});
*/

// Configuración de i18n para internacionalización
i18n.configure({
  locales: ['es', 'en'],
  cookie: 'language',
  directory: `${__dirname}/locales`
});

// Configuración de motor de vistas y middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);
app.get('/', (req, res) => res.send('¡Aplicación conectada a MongoDB Atlas!'));

// Protección de rutas con JWT (descomentar si se utiliza)
//app.use(expressjwt({ secret: jwtKey, algorithms: ['HS256'] })
//  .unless({ path: ["/login"] }));

// Rutas de la aplicación
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
app.use('/cards', cardsRouter);
app.use('/columns', columnsRouter);
app.use('/developers', developersRouter);
app.use('/permissions', permissionsRouter);
app.use('/projectRoles', projectRolesRouter);
app.use('/projects', projectsRouter);
app.use('/skills', skillsRouter);
app.use('/socialNetworks', socialNetworksRouter);
app.use('/sprints', sprintsRouter);

// Manejo de errores 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores global
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
