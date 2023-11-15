import React, { useRef, useEffect } from "react";
import myApi from "./../service/service.js";
import { useAuth } from "./../context/AuthContext";
import { Navigate, useParams } from "react-router-dom";

function UpdateProfile() {
  const firstnameInput = useRef();
  const lastnameInput = useRef();
  const pictureInput = useRef();
  const ageInput = useRef();
  const cityInput = useRef();
  const { id } = useParams();
  const { user, setUser } = useAuth();
  if (!user) {
    return <Navigate to={"/"} />;
  }
  const isMe = id === user._id;

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
      const res = await myApi.put(
        `/users`,
        fd
        // firstname,
        // lastname,
        // // if(picture) {
        // picture,
        // // },
        // age,
        // city,
      );
      //   console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    try {
      const res = await myApi.delete("/users/");
      localStorage.removeItem("authToken");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isMe && (
        <div>
          <h1>Update your profile</h1>

          <form>
            <label htmlFor="firstname">Firstname:</label>
            <input
              type="text"
              id="firstname"
              defaultValue={user.firstname}
              ref={firstnameInput}
              name="firstname"
              required
            ></input>

            <label htmlFor="lastname">Lastname:</label>
            <input
              type="text"
              id="lastname"
              defaultValue={user.lastname}
              ref={lastnameInput}
              name="lastname"
              required
            ></input>

            <label htmlFor="age">Age:</label>
            <input
              type="Number"
              id="age"
              defaultValue={user.age}
              ref={ageInput}
              name="age"
              required
            ></input>

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              defaultValue={user.city}
              ref={cityInput}
              name="city"
              required
            ></input>

            <label htmlFor="picture">Profile Picture</label>
            <input ref={pictureInput} type="file" name="" id="picture" />

            <button onClick={handleUpdateProfile}>Edit Profile</button>

            <button onClick={() => handleDelete(user._id)}>
              Delete Profile
            </button>
          </form>
        </div>
      )}
      {!isMe && <h3>Wrong Page</h3>}
    </div>
  );
}

export default UpdateProfile;
