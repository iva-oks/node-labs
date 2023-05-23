import "./leftBar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";


const LeftBar = () => {

	const { currentUser } = useContext(AuthContext);

	// const { isLoading, error, data } = useQuery(["friends"], () =>
	// 	makeRequest.get("/friends").then((res) => {
	// 		return res.data;
	// 	})
	// );

	return (
		<div className="leftBar">
			<div className="container">
				<div className="user">
				    <img src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLP6xJXBY_W2tT5waakogfnpHk4uhpVTy7A&usqp=CAU"} alt="profile" />
					<Link to={`/profile/${currentUser._id}`} style={{ textDecoration: "none", color: "inherit" }}>
						<span>{currentUser.name}</span>
					</Link>
				</div>
				
			</div>
		</div>
	)
};

export default LeftBar;