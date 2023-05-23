import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	name: String,
	coverPic: String,
	profilePic: String,
	city: String
});

const User = mongoose.model("User", userSchema);
export default User;