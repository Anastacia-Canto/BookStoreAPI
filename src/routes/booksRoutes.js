import express from "express";
import BookController from "../controller/booksController.js";

const router = express.Router();

router
	.get("/books", BookController.listBooks)
	.get("/books/:id", BookController.listBooksByID)
	.post("/books", BookController.registerBook)
	.put("/books/:id", BookController.updateBook);

export default router;