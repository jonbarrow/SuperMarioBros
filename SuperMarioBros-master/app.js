var port = 80,
	express = require('express'),
	server = express();

var connected_clients = {};

const WALKING_DIR_VALUES = {
    up: 270,
    down: 90,
    right: 360,
    left: 180,
}

server.use(express.static(__dirname));

server.listen(port, () => {
	console.log('Server started on port `' + port + '`');
})

server.get('/', (req, res) => {
  	res.render('index');
});
