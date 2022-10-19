//creating a local server

import app from './src/app.js'

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening port http://localhost:${port}`);
})