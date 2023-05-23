import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	desc: String,
	createdAt: Date,
	userId: String,
	postId: String
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;