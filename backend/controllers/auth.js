import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	try{
		const {
			username,
			email,
			password,
			name
		} = req.body;

		const user = await User.findOne({username: username});
		if (user) return res.status(409).json({msg: "User already exists!"});

		const salt = bcrypt.genSaltSync(10); // to hash a password
		const hashedPassword = bcrypt.hashSync(password, salt);  // hash a password of a new user

		const createdUser = new User({
			username,
			email,
			password : hashedPassword,
			name,
			coverPic: "",
			profilePic: "",
			city: ""
		});

		const savedUser = await createdUser.save();

		res.status(201).json(savedUser);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

export const login = async (req, res) => {
	try{
		const { username, password } = req.body;
		
		const user = await User.findOne({username: username});
		if (!user) return res.status(400).json({msg: "User not found."});

		const checkPassword = bcrypt.compareSync(password, user.password); // check if equal
		if (!checkPassword) return res.status(400).json({msg: "Wrong password or username."});

		const token = jwt.sign({ id: user._id }, "secretkey");
		delete user.password;

	 	res.cookie("accessToken", token, {
	 		httpOnly: true,        // in this case random scripts cannot use our cookie
	 	}).status(200).json(user); // all except password

	} catch (err) {
		res.status(500).json({error: err.message});
	}
	
};

export const logout = (req, res) => {
	res.clearCookie("accessToken", {
		secure: true,
		sameSite: "none"
	}).status(200).json("User has been logged out.");
};