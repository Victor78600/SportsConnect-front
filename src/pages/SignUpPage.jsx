import { useRef, useState } from "react";
import myApi from "../service/service";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const pictureInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Manage button create user with picture
  async function handleSubmit(event) {
    event.preventDefault();
    const firstname = firstnameInput.current.value;
    const lastname = lastnameInput.current.value;
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const picture = pictureInput.current.files[0];

    const fd = new FormData();
    fd.append("firstname", firstname);
    fd.append("lastname", lastname);
    fd.append("username", username);
    fd.append("password", password);
    fd.append("picture", picture);

    try {
      const response = await myApi.signup(fd);
      // console.log("success", response);
      navigate("/login");
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
      <div className="LoginImput">
        <label htmlFor="firstname">Firstname </label>
        <br />
        <input
          type="text"
          ref={firstnameInput}
          id="firstname"
          autoComplete="off"
        />
      </div>
      <div className="LoginInput">
        <label htmlFor="lastname">Lastname </label>
        <br />
        <input
          type="text"
          ref={lastnameInput}
          id="lastname"
          autoComplete="off"
        />
      </div>
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
      <div className="LoginInput">
        <label htmlFor="picture">Profile Picture</label>
        <input ref={pictureInput} type="file" name="" id="picture" />
      </div>
      <button className="LoginInput">Signup</button>
      <p className="error">{error}</p>
    </form>
  );
}

export default SignupPage;
