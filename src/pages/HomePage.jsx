import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import UserDisplayer from "./../components/UserDisplayer/UserDisplayer";
function HomePage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <p className="HomeLogin">
        Please <Link to="/login">Log in</Link>
      </p>
    );
  }
  return <UserDisplayer />;
}

export default HomePage;
