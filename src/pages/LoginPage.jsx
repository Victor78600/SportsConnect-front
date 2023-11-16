import { useRef, useState } from "react";
import myApi from "../service/service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

function LoginPage() {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authenticateUser } = useAuth();

  //submit login button
  //send token if username and password OK
  async function handleSubmit(event) {
    event.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    try {
      const response = await myApi.post("/auth/login", { username, password });
      // console.log("success", response);
      localStorage.setItem("authToken", response.data.token);
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <form className="HomeLogin" onSubmit={handleSubmit}>
      <div className="LoginInput">
        <label htmlFor="username">Username </label>
        <br />
        <input
          type="text"
          ref={usernameInput}
          id="username"
          autoComplete="off"
        />
      </div>
      <div className="LoginInput">
        <label htmlFor="password">Password </label>
        <br />
        <input type="password" ref={passwordInput} id="password" />
      </div>
      <button className="LoginInput">Login</button>
      <p className="error">{error}</p>
    </form>
  );
}

export default LoginPage;
