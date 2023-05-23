import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema({
	followerUserId: String,
	followedUserId: String
});

const Relationship = mongoose.model("Relationship", relationshipSchema);
export default Relationship;