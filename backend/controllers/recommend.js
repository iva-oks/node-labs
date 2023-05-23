import User from "../models/user.js";
import jwt from "jsonwebtoken";
import redis from "redis";

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

/* get all users */
export const getRecommends = async (req, res) => {
	try{
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in.");

		jwt.verify(token, "secretkey", (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid.");
		});

		const cashedUsers = "cashedUsers";

		const users = await User.find();

		await redisClient.set(cashedUsers, JSON.stringify(users));

		return res.status(200).json(users);

	} catch (err) {
		res.status(500).json({error: err.message});
	}
};