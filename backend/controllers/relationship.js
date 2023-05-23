import Relationship from "../models/relationship.js";
import jwt from "jsonwebtoken";

export const getRelationships = async (req, res) => {
	try{
		const followedUserId = req.query.followedUserId;
		
		const relationships = await Relationship.find({followedUserId: followedUserId});

		return res.status(200).json(relationships.map(relationship => relationship.followerUserId));

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const addRelationship = async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const followedUserId = req.body.userId;
		let followerUserId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");

		followerUserId = userInfo.id;
	});

	const createdRelationship = new Relationship({
		followerUserId: followerUserId,
		followedUserId: followedUserId
	});

	const savedRelationship =  await createdRelationship.save();
	res.status(201).json(savedRelationship);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const deleteRelationship =  async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		const followedUserId = req.query.userId;
		let followerUserId;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");

		followerUserId = userInfo.id;
	});

	const deletedRelationship = await Relationship.findOneAndDelete({followerUserId: followerUserId, followedUserId: followedUserId });

	res.json(deletedRelationship);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};