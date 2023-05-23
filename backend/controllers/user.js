import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
	try{

		const userId = req.params.userId;
		
		const user = await User.findById(userId);
		if (!user) return res.status(400).json({msg: "User not found."});

		delete user.password;

		return res.json(user);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const updateUser =  async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not authenticated.");

		const {
			coverPic,
			profilePic,
		} = req.body;
		let id;

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");

		id = userInfo.id;
	});

	const updatedUser = await User.updateOne({_id: id}, {coverPic: coverPic, profilePic: profilePic });
	res.json(updatedUser);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};