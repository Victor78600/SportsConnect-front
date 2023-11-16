import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

function Navbar() {
  const { isLoggedIn, authenticateUser, user } = useAuth();
  const navigate = useNavigate();

  //Button Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  //Change the title if the user is connected or not
  const title = user ? `Hello ${user.firstname}` : "SportsConnect";

  //Button My Profile
  const handleProfileButton = () => {
    navigate(`/${user._id}`);
  };

  //Button Home
  const handleHomeButton = () => {
    navigate("/");
  };

  return (
    <div className="Navbar">
      <nav>
        <ul>
          <li>
            <button className="NavButton" onClick={handleHomeButton}>
              Home
            </button>
          </li>
          {isLoggedIn && user && (
            <li className="MyProfile">
              <button className="NavButton" onClick={handleProfileButton}>
                My Profile
              </button>
              <>
                <Avatar className="NavPicture" size="s" url={user.picture} />
              </>
            </li>
          )}
        </ul>
      </nav>
      <Link to="/">
        <p className="title">{title}</p>
      </Link>
      <nav>
        <ul>
          {isLoggedIn ? (
            <li>
              <button className="NavButton" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
