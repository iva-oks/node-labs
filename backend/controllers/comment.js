//import { db } from "../connect.js";

import Comment from "../models/comment.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = async (req, res) => {
	try{
		const postId = req.query.postId;

		const comments = await Comment.find({postId: postId});
		
		return res.status(200).json(comments);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const addComment = async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const { desc, postId } = req.body;
		let userId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");
		userId = userInfo.id;
		});

	const createdComment = new Comment({
		desc,
		createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
		userId,
		postId
	});

	const savedComment = await createdComment.save();

	res.status(201).json(savedComment);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const deleteComment =  async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const commentId = req.params.id;
		let userId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");
		userId = userInfo.id;
	});

	const deletedComment = await Comment.findOneAndDelete({_id: commentId, userId: userId });

	res.json(deletedComment);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};