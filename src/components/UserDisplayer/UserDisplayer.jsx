import { useState, useEffect } from "react";
import myApi from "./../../service/service.js";
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext.jsx";
import "./UserDisplayer.css";
import Avatar from "../Avatar/Avatar.jsx";

function UserDisplayer() {
  const [allUsers, setAllUsers] = useState(null);
  const [activities, setActivities] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  // const { user } = useAuth();
  const navigate = useNavigate();

  //Find activities of people you are following
  useEffect(() => {
    myApi
      .get("/activities/friends")
      .then((res) => setActivities(res.data))
      .catch((err) => console.log(err));
  }, []);

  //Fetch all users
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

  if (!activities) {
    return <p>Loading...</p>;
  }

  //Search someone button
  const handleClickSearch = () => {
    navigate(`/${selectedUser}`);
  };

  //Create activity button
  const handleCreateActivity = () => {
    navigate("/new-activity");
  };

  return (
    <div className="HomePage">
      <div className="SearchDiv">
        {/* <p>{error}</p> */}
        {/* Search all user in an input */}
        <input
          className="HomeButton"
          type="text"
          list="all-users"
          value={selectedUser._id}
          onChange={(e) => {
            setSelectedUser(e.target.value);
          }}
        />
        <datalist id="all-users">
          {allUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstname} {user.lastname}, {user.username}
            </option>
          ))}
        </datalist>
        <br />
        <button className="SearchButton HomeButton" onClick={handleClickSearch}>
          Search someone
        </button>
      </div>
      <button className="HomeButton" onClick={handleCreateActivity}>
        Create an activity
      </button>

      {/* Fetch all activities of your friend/follow */}
      {activities.map((activity) => {
        return (
          <Link
            className="DisplayActivites"
            to={`/activities/${activity._id}`}
            key={activity._id}
          >
            <div key={activity._id}>
              <div className="hearderActivity">
                <div className="CreatorProfile">
                  <Avatar size="s" url={activity.creator.picture} />
                  <div className="NameCreator">
                    <p>
                      {activity.creator.firstname} {activity.creator.lastname}
                    </p>
                    <p className="ActivityCity">
                      {activity.city}, {activity.sports}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="Duration">Duration: {activity.duration}h</p>
                </div>
              </div>
              <p className="ActivityDesc">{activity.description}</p>

              {/* Fetch all participants of the activity of your friend */}
              {/* {activity.participants > 0 && <p>Participants:</p>} */}
              <div className="Participants">
                {activity.participants.map((participant) => {
                  return (
                    <div key={participant._id}>
                      <p id="ParticipantsName">
                        {participant.firstname} {participant.lastname}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default UserDisplayer;
