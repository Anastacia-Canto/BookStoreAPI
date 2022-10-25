import express from "express";
import PublisherController from "../controller/publisherController.js";

const router = express.Router();

router
	.get("/publishers", PublisherController.listPublishers)
	.get("/publishers/:id", PublisherController.listPublishersByID)
	.post("/publishers", PublisherController.registerPublisher)
	.put("/publishers/:id", PublisherController.updatePublisher)
	.delete("/publishers/:id", PublisherController.deletePublhisher);

export default router;