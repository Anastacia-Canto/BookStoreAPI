//creating a local server

const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Node class');
});

server.listen(port, () => {
	console.log(`Server listening port http://localhost:${port}`);
})