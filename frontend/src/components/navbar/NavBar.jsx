import "./navBar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';  
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const NavBar = () => { 

	const { currentUser } = useContext(AuthContext);


	return (
		<div className="navBar">
			<div className="left">
				<span>inTouch</span>
			</div>

			<div className="right">
				<Link to="/login">
					<button>Увійти</button>
				</Link>
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

export default NavBar;