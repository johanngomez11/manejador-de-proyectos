function create(req, res, next) {
    res.send(`POST => /burndowncharts/ => ${req.body.sprint}`);
}

function list(req, res, next) {
    res.send('GET => /burndowncharts/');
}

function index(req, res, next) {
    res.send(`GET => /burndowncharts/${req.params.id}`);
}

function update(req, res, next) {
    res.send('PUT => /burndowncharts/:id');
}

function destroy(req, res, next) {
    res.send('DELETE => /burndowncharts/:id');
}

module.exports = {create, list, index, update, destroy};
