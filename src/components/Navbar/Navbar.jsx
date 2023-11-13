import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

function Navbar() {
  const { isLoggedIn, authenticateUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  const title = user ? `Hello ${user.firstname}` : "SportsConnect";
  console.log(user);

  const handleProfileButton = () => {
    navigate(`/${user._id}`);
  };

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
            <li>
              <button className="NavButton" onClick={handleProfileButton}>
                My Profile
              </button>
            </li>
          )}
        </ul>
      </nav>
      {isLoggedIn && user && (
        <>
          <Avatar size="m" url={user.picture} />
        </>
      )}
      <Link to="/">
        <p className="title">{title}</p>
      </Link>
      <nav>
        <ul>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
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
