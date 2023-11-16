import React, { useRef } from "react";
import myApi from "./../service/service.js";
import { useAuth } from "./../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProfile() {
  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const pictureInput = useRef();
  const ageInput = useRef();
  const cityInput = useRef();
  const { id } = useParams();
  const Navigate = useNavigate();
  const { user, setUser } = useAuth();
  if (!user) {
    return <Navigate to={"/"} />;
  }
  const isMe = id === user._id;

  //Update user button with picture
  async function handleUpdateProfile(event) {
    event.preventDefault();
    const firstname = firstnameInput.current.value;
    const lastname = lastnameInput.current.value;
    const picture = pictureInput.current.files[0];
    const age = ageInput.current.value;
    const city = cityInput.current.value;

    const fd = new FormData();
    fd.append("firstname", firstname);
    fd.append("lastname", lastname);
    if (picture) {
      fd.append("picture", picture);
    }
    fd.append("age", age);
    fd.append("city", city);

    try {
      const res = await myApi.put(`/users`, fd);

      setUser(res.data);
      Navigate(`/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  //delete user button
  const handleDelete = async () => {
    try {
      const res = await myApi.delete("/users/");
      setUser(null);
      localStorage.removeItem("authToken");
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isMe && (
        <div className="FormPages">
          <h2>Update your profile</h2>

          <form className="Form">
            <div className="FormElement">
              <label htmlFor="firstname">Firstname</label>
              <br />
              <input
                type="text"
                id="firstname"
                defaultValue={user.firstname}
                ref={firstnameInput}
                name="firstname"
                required
              ></input>
            </div>
            <div className="FormElement">
              <label htmlFor="lastname">Lastname</label>
              <br />
              <input
                type="text"
                id="lastname"
                defaultValue={user.lastname}
                ref={lastnameInput}
                name="lastname"
                required
              ></input>
            </div>
            <div className="FormElement">
              <label htmlFor="age">Age</label>
              <br />
              <input
                type="Number"
                id="age"
                defaultValue={user.age}
                ref={ageInput}
                name="age"
                required
              ></input>
            </div>
            <div className="FormElement">
              <label htmlFor="city">City</label>
              <br />
              <input
                type="text"
                id="city"
                defaultValue={user.city}
                ref={cityInput}
                name="city"
                required
              ></input>
            </div>
            <div className="FormElement">
              <label htmlFor="picture">Profile Picture</label>
              <br />
              <input ref={pictureInput} type="file" name="" id="picture" />
            </div>
            <div className="FormElement">
              <button onClick={handleUpdateProfile}>Edit Profile</button>
            </div>
            <div className="FormElement">
              <button onClick={() => handleDelete(user._id)}>
                Delete Profile
              </button>
            </div>
          </form>
          <button
            id="BackButton"
            onClick={() => {
              Navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      )}
      {!isMe && <h3>Wrong Page</h3>}
    </div>
  );
}

export default UpdateProfile;
