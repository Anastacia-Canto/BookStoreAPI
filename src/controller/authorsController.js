import authors from "../models/Author.js";

class AuthorController {

	static listAuthors = (req, res) => {
		authors.find((err, authors) => {
			res.status(200).json(authors);
		});
	};

	static listAuthorByID = (req, res) => {
		const id = req.params.id;

		authors.findById(id, (err, authors) => {
			if (authors == null) {
				res.status(404).send({message: 'Id not found'});
			} else if (err){
				res.status(400).send({message: `${err.message} - Id out of pattern`});
			} else {
				res.status(200).send(authors);
			};
		});
	};

	static registerAuthor = (req, res) => {
		
		let author = new authors(req.body);

		author.save((err) => {
			if (err){
				res.status(500).send({message: `${err.message} - failed to register author`});
			} else {
				res.status(201).send(author.toJSON());
			};
		});
	};

	static updateAuthor = (req, res) => {
		const id = req.params.id;

		authors.findByIdAndUpdate(id, {$set: req.body}, (err, authors) => {
			if (authors == null) {
				res.status(404).send({message: 'Id not found'});
			} else if (err) {
				res.status(400).send({message: `${err.message} - Id out of pattern`});
			} else {
				res.status(201).send({message: 'Author successfully updated'});
			};
		});
	};

	static deleteAuthor = (req, res) => {
		const id = req.params.id;

		authors.findByIdAndDelete(id, (err, authors) => {
			if (authors == null) {
				res.status(404).send({message: 'Id not found'});
			} else if (err) {
				res.status(400).send({message: `${err.message} - Id out of pattern`});
			} else {
				res.status(201).send({message: 'Author successfully deleted'});
			};
		});
	};

};

export default AuthorController;