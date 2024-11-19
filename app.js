const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
