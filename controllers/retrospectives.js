function create(req, res, next) {
    res.send(`POST => /retrospectives/ => ${req.body.sprint}`);
}

function list(req, res, next) {
    res.send('GET => /retrospectives/');
}

function index(req, res, next) {
    res.send(`GET => /retrospectives/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /retrospectives/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /retrospectives/:id');
}

module.exports = {create, list, index, update, destroy};
