import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
	{
		name: {type: String, required: true}
	},
	{
		versionKey: false
	}
);

const publishers = mongoose.model("publishers", publisherSchema);

export default publishers;