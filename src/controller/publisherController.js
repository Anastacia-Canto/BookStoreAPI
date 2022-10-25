import publishers from "../models/Publisher.js";

class PublisherController {

	static listPublishers = (req, res) => {
		publishers.find((err, publishers) => {
			res.status(200).json(publishers);
		});
	};

	static listPublishersByID = (req, res) => {
		const id = req.params.id;

		publishers.findById(id, (err, publishers) => {
			if (publishers == null) {
				res.status(404).send({message: 'Id not found'});
			} else if(err) {
				res.status(400).send({message: `${err.message} - Id out of pattern`});
			} else {
				res.status(200).send(publishers);
			};
		});

	};

	static registerPublisher = (req, res) => {
		let publisher = new publishers(req.body);

		publisher.save((err) => {
			if (err) {
				res.status(500).send({message: `${err.message} - failed to register publisher`});
			} else {
				res.status(201).send(publisher.toJSON());
			};
		});
	};

	static updatePublisher = (req, res) => {
		const id = req.params.id;

		publishers.findByIdAndUpdate(id, {$set: req.body}, (err, publishers) => {
			if (publishers == null) {
				res.status(404).send({message: 'Id not found'});
			} else if (err) {
				res.status(400).send({message: `${err.message} - Id out of pattern`});
			} else {
				res.status(201).send({message: 'Publisher successfully updated'});
			};
		});
	};

	static deletePublhisher = (req, res) => {
		const id = req.params.id;

		publishers.findByIdAndDelete(id, (err, publishers) => {
			if (publishers == null) {
				res.status(404).end({message: 'Id not found'});
			} else if (err) {
				res.status(400).send({message: `${err.message} - Id out of pattern`});
			} else {
				res.status(201).send({message: 'Publisher successfully deleted'});
			};
		});
	};

};

export default PublisherController;