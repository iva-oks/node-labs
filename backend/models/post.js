import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	desc: String,
	img: String,
	userId: String,
	createdAt: Date
});

const Post = mongoose.model("Post", postSchema);
export default Post;