import { useState, useEffect, useRef } from "react";
import myApi from "./../../service/service.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
// import SelectedUserId from "./../SelectedUserId.jsx";

function UserDisplayer() {
  const [allUsers, setAllUsers] = useState(null);
  const [activities, setActivities] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const followedUser = user.follow;
  // console.log(followedUser);

  // const fetchUserSelected = async () => {
  //   try {
  //     const response = await myApi.get(`/users/user/${selectedUser}`);
  //     setUser(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserSelected();
  // }, []);

  // if (!user) {
  //   return <p>Loading...</p>;
  // }

  useEffect(() => {
    myApi
      .get("/activities/friends")
      .then((res) => setActivities(res.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(activities);

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

  const handleClickSearch = () => {
    navigate(`/${selectedUser}`);
  };

  const handleCreateActivity = () => {
    navigate("/new-activity");
  };

  // function fetchActivity(id) {
  //   const response = myApi.get(`/activities/${id}/user`);
  //   setActivities(response.data);
  //   console.log(response.data);
  // }

  return (
    <div className="form">
      <div>
        {/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}
        <p>{error}</p>
        <input
          type="text"
          list="all-users"
          value={selectedUser._id}
          onChange={(e) => {
            // console.log(e.target);
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
        {/* {allUsers.map((user) => {
            return (
              <p key={user._id} value={user.username}>
                {user.username}
              </p>
            );
          })} */}

        <button onClick={handleClickSearch}>Search someone</button>
      </div>
      <button onClick={handleCreateActivity}>Create activity</button>
      {activities.map((activity) => {
        return (
          <Link to={`/activities/${activity._id}`} key={activity._id}>
            <div
              key={activity._id}
              style={{
                display: "flex",
              }}
            >
              <p>{activity.creator.firstname}</p>
              <p>{activity.creator.lastname}</p>
              <p>{activity.city}</p>
              <p>{activity.sports}</p>
              <p>{activity.description}</p>
              <p>{activity.duration}</p>
              {activity.participants.map((participant) => {
                return (
                  <div key={participant._id}>
                    <p>{participant.firstname}</p>
                    <p>{participant.lastname}</p>
                  </div>
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default UserDisplayer;
