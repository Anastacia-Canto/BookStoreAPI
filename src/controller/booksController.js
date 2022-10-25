import books from "../models/Book.js";
import publishers from "../models/Publisher.js";

class BookController {
	
	static listBooks = (req, res) => {

		books.find()
			.populate('author')
			.populate('publisher')
			.exec((err, books) => {
			res.status(200).json(books);
		});
	};

	static listBooksByID = (req, res) => {
		const id = req.params.id;
		books.findById(id)
			.populate('author', 'name')
			.populate('publisher', 'name')
			.exec((err, books) => {
				if (err) {
					res.status(400).send({message: `${err.message} id out of pattern`});
				} else if (books == null) {
					res.status(404).send({message: 'Id nout found'});
				} else {
					res.status(200).send(books);
				};
			});
	}

	static registerBook = (req, res) => {
		
		let book = new books(req.body);

		book.save((err) => {
			if (err) {
				res.status(500).send({message: `${err.message} - failed to register book`});
			} else {
				res.status(201).send(book.toJSON());
			};
		});
	};

	static updateBook = (req, res) => {
		const id = req.params.id;

		books.findByIdAndUpdate(id, {$set: req.body}, (err, books) => {
			if (books == null) {
				res.status(400).send({message: 'Id not found'});
			} else if(!err) {
				res.status(201).send({message: 'Book successfully updated'});
			} else {
				res.status(500).send({message: err.message});
			};
		});
	};

	static deleteBook = (req, res) => {
		const id = req.params.id;

		books.findByIdAndDelete(id, (err, books) => {
			if (books == null){
				res.status(400).send({message: 'Id not found'});
			} else if (!err) {
				res.status(200).send({message: 'Book successfully deleted'});
			} else {
				res.status(500).send({message: err.message});
			};
		});
	};

	static async listByPublisher(req, res) {
		const publisher = req.query.publisher.replace('_', ' ');

		const name = await publishers.findOne({'name': publisher});

		if (name){
			books.find({'publisher': name._id })
			.populate('author')
			.populate('publisher')
			.exec((err, books) => {
					res.status(200).json(books);
			});
		} else {
			res.status(404).send({message: 'Publisher not found'});
		};

	};
};

export default BookController;