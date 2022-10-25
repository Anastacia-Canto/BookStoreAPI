import express from "express";
import router from "./booksRoutes.js";


const routes = (app) => {
	app.route('/').get((req, res) => {
		res.status(200).send({title: "Node class"});
	});

	app.use(
		express.json(),
		router
	);
};

export default routes;