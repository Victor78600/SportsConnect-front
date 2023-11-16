import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useParams } from "react-router-dom";
import myApi from "./../service/service.js";
import Avatar from "../components/Avatar/Avatar.jsx";
import { useNavigate } from "react-router-dom";

function ProfilPage() {
  const [activities, setActivities] = useState(null);
  // const [activity, setActivity] = useState("");
  const [users, setUsers] = useState(null);
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  // const [follow, setFollow] = useState(user.follow.includes(id));
  const follow = user.follow.includes(id);
  // console.log(user.follow);

  // const title = user._id === id ? "edit profile" : "SportsConnect";
  const imEditor = user._id === id;

  async function fetchProfil() {
    try {
      const response = await myApi.get(`/users/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProfil();
  }, [id]);

  async function fetchActivity() {
    try {
      const response = await myApi.get(`/activities/${id}/user`);
      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
    // setFollow((prevFollow) => !prevFollow);
  }
  useEffect(() => {
    fetchActivity();
  }, [id]);

  // const handleCreateActivity = async () => {
  //   try {
  //     const res = await myApi.post("/activities/" + id, { activity });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      const res = await myApi.delete("/activities/" + id);
      setActivities(res.data);
      fetchActivity();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowButton = async (id) => {
    try {
      if (follow) {
        const res = await myApi.put(`/users/${id}/unfollow`);
        setUser(res.data);
      } else {
        const res = await myApi.put(`/users/${id}/follow`);
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(1);
  };

  // async function handleFollowButton(event) {
  //   event.preventDefault();
  //   try {
  //     const res = await myApi.put(`/users/${id}/follow`);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchProfil();
  // }, [id]);

  if (!users) {
    return <p>Loading...</p>;
  }

  if (!activities) {
    return <p>No activity</p>;
  }

  const handleEditProfil = () => {
    navigate(`/${id}/edit`);
  };

  const handleCreateActivity = () => {
    navigate(`/new-activity`);
  };

  // const handleFollowButton = async (id) => {
  //   if (isFollow) {
  //     user.follow = user.follow.filter((follow) => follow.id !== String(id));
  //   } else {
  //     myApi.put(`/users/${id}`, { follow: String(id) });
  //   }
  //   await updateUser(user);
  //   setIsFollow(!isFollow);
  // };

  return (
    <div className="profil">
      <div>
        <Avatar size="l" url={users.picture} />
      </div>
      <p>Prénom : {users.firstname}</p>
      <p>Nom : {users.lastname}</p>
      {imEditor && (
        <button className="EditProfile" onClick={handleEditProfil}>
          Edit profile
        </button>
      )}
      {imEditor && (
        <button className="CreateActivity" onClick={handleCreateActivity}>
          Create a new activity
        </button>
      )}
      {!imEditor && (
        <div>
          <button className="Follow" onClick={() => handleFollowButton(id)}>
            {follow ? `Unfollow` : "Follow"}
          </button>
        </div>
      )}
      {activities.map((activity) => {
        console.log(user._id);
        console.log(activity.creator._id);
        const isMe = activity.creator._id === user._id;
        // const side = isMe ? "marginLeft" : "marginRight";
        // console.log(activity.creator);
        return (
          <div className="DisplayActivites" key={activity._id}>
            <Link to={`/activities/${activity._id}`}>
              {/* <div>
              <Avatar size="s" url={activity.creator.picture} />
            </div> */}
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
            {isMe && (
              <button
                id="DeleteActivity"
                onClick={() => handleDelete(activity._id)}
              >
                🗑️
              </button>
            )}
          </div>
        );
      })}
      {/* <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      ></textarea> */}
      {/* <button onClick={handleCreateActivity}>Create activity</button> */}
    </div>
  );
}

export default ProfilPage;
