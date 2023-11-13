import React, { useRef, useState } from "react";
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
  //   const [formData, setFormData] = useState({
  //     sports: "",
  //     duration: "",
  //     description: "",
  //     city: "",
  //     participants: [],
  //   });

  async function handleUpdateProfile(event) {
    event.preventDefault();
    const firstname = firstnameInput.current.value;
    const lastname = lastnameInput.current.value;
    const picture = pictureInput.current.value;
    const age = ageInput.current.value;
    const city = cityInput.current.value;
    // const participants = participantsInput.current.value;

    // const fd = new FormData();
    // fd.append("firstname", firstname);
    // fd.append("lastname", lastname);
    // fd.append("picture", picture);
    // fd.append("age", age);
    // fd.append("city", city);

    try {
      const res = await myApi.put(`/users`, {
        firstname,
        lastname,
        picture,
        age,
        city,
      });
      console.log(res.data);
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
              ref={firstnameInput}
              name="firstname"
              required
            ></input>

            <label htmlFor="lastname">Lastname:</label>
            <input
              type="text"
              id="lastname"
              ref={lastnameInput}
              name="lastname"
              required
            ></input>

            <label htmlFor="age">Age:</label>
            <input
              type="Number"
              id="age"
              ref={ageInput}
              name="age"
              required
            ></input>

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
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
