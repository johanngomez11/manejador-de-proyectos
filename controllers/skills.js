function create(req, res, next) {
    res.send(`POST => /skills/ => ${req.body.skillName}`);
}

function list(req, res, next) {
    res.send('GET => /skills/');
}

function index(req, res, next) {
    res.send(`GET => /skills/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /skills/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /skills/:id');
}

module.exports = {create, list, index, update, destroy};
