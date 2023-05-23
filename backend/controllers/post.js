import Post from "../models/post.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = async (req, res) => {
	try{
		const userId = req.query.userId;
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");
		});

		if (userId !== "undefined") {
			const userPosts = await Post.find({userId: userId});
			return res.status(200).json(userPosts);
		} 

		const posts = await Post.find();
		return res.status(200).json(posts);
		
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const addPost = async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const { desc, img, } = req.body;
		let userId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");

		userId = userInfo.id;
	});

	const createdPost = new Post({
		desc,
		img,
		userId,
		createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
	});

	const savedPost = await createdPost.save();

	res.status(201).json(savedPost);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const deletePost =  async (req, res) => {  
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const postId = req.params.id;
		let userId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");
		userId = userInfo.id;
	});

	const deletedPost = await Post.findOneAndDelete({_id: postId, userId: userId });
	res.json(deletedPost);

	} catch (err) {
		res.status(500).json({error: err.message});
	}

};