function create(req, res, next) {
    res.send(`POST => /boards/ => ${req.body.name}`);
}

function list(req, res, next) {
    res.send('GET => /boards/');
}

function index(req, res, next) {
    res.send(`GET => /boards/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /boards/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /boards/:id');
}

module.exports = {create, list, index, update, destroy};
