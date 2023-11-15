import React, { useRef, useState, useEffect } from "react";
import myApi from "./../service/service.js";
import { useAuth } from "./../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function CreateActivityPage() {
  const sportsInput = useRef();
  const durationInput = useRef();
  const descriptionInput = useRef();
  const cityInput = useRef();
  const participantsInput = useRef();
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState(null);
  const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     sports: "",
  //     duration: "",
  //     description: "",
  //     city: "",
  //     participants: [],
  //   });

  const fetchAllUsers = async () => {
    try {
      const response = await myApi.get("/users");
      setAllUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (!allUsers) {
    return <p>Loading...</p>;
  }

  async function handleCreateActivity(event) {
    event.preventDefault();
    const sports = sportsInput.current.value;
    const duration = durationInput.current.value;
    const description = descriptionInput.current.value;
    const city = cityInput.current.value;

    const participants = Array.from(
      participantsInput.current.selectedOptions
    ).map((option) => option.value);
    const creator = user._id;
    try {
      const res = await myApi.post(`/activities`, {
        sports,
        duration,
        description,
        city,
        participants,
        creator,
      });
      navigate(`/${user._id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log(user._id);
  }
  return (
    <div>
      <h1>Activity Form</h1>

      <form>
        <label htmlFor="sports">Sports:</label>
        <select id="sports" ref={sportsInput} name="sports" required>
          <option value="" disabled>
            Select a sport
          </option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Golf">Golf</option>
          <option value="Cricket">Cricket</option>
          <option value="Badminton">Badminton</option>
          <option value="Athletics">Athletics</option>
          <option value="Swimming">Swimming</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Rugby">Rugby</option>
          <option value="Table Tennis">Table Tennis</option>
          <option value="Baseball">Baseball</option>
          <option value="Boxing">Boxing</option>
          <option value="Cycling">Cycling</option>
          <option value="Mixed Martial Arts">Mixed Martial Arts</option>
          <option value="Climbing">Climbing</option>
          <option value="Gymnastics">Gymnastics</option>
          <option value="Ice Hockey">Ice Hockey</option>
          <option value="Skiing">Skiing</option>
          <option value="Snowboarding">Snowboarding</option>
          <option value="American Football">American Football</option>
          <option value="Running">Running</option>
          <option value="Sailing">Sailing</option>
          <option value="Equestrian Sports">Equestrian Sports</option>
          <option value="Water Sports">Water Sports</option>
          <option value="Karate">Karate</option>
          <option value="Taekwondo">Taekwondo</option>
        </select>

        <label htmlFor="duration">Duration :</label>
        <input
          type="number"
          id="duration"
          ref={durationInput}
          name="duration"
          required
        ></input>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          ref={descriptionInput}
          required
        ></textarea>

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          ref={cityInput}
          name="city"
          required
        ></input>

        <label htmlFor="participants">Participants:</label>
        <select
          id="participants"
          ref={participantsInput}
          name="participants"
          multiple
        >
          {allUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </select>

        <button onClick={handleCreateActivity}>Create activity</button>
      </form>
    </div>
  );
}

export default CreateActivityPage;
