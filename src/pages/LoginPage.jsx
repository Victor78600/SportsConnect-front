import { useRef, useState, useContext } from "react";
import myApi from "../service/service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
// import { AuthContext } from "./../context/AuthContext.jsx"

/**
 * To have access to the values store in a context we neee:
 * - the Context (AuthContext here)
 * - useContext to well.. Use the context.?
 */

function LoginPage() {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { authenticateUser } = useAuth();

  // const something = useContext(AuthContext)

  // console.log(context)
  async function handleSubmit(event) {
    event.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    try {
      const response = await myApi.post("/auth/login", { username, password });
      console.log("success", response);
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
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          ref={usernameInput}
          id="username"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" ref={passwordInput} id="password" />
      </div>
      <button>Login</button>
      <p className="error">{error}</p>
    </form>
  );
}

export default LoginPage;
