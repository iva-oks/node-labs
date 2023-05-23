//import { db } from "../connect.js";

import Like from "../models/like.js";
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {
	try{
		const postId = req.query.postId;
		
		const likes = await Like.find({postId: postId});

		return res.status(200).json(likes.map(like => like.userId));

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const addLike = async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const postId = req.body.postId;
		let userId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");

		userId = userInfo.id;
	});

	const createdLike = new Like({
		userId,
		postId
	});

	const savedLike = await createdLike.save();
	res.status(201).json(savedLike);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const deleteLike =  async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const postId = req.query.postId;
		let userId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");

		userId = userInfo.id;
	});

	const deletedlike =  await Like.findOneAndDelete({userId: userId, postId: postId });

	res.json(deletedlike);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};