import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useParams } from "react-router-dom";
import myApi from "./../service/service.js";
import Avatar from "../components/Avatar/Avatar.jsx";
import { useNavigate } from "react-router-dom";

function ProfilPage() {
  const [activities, setActivities] = useState(null);
  const [users, setUsers] = useState(null);
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const follow = user.follow.includes(id);
  const imEditor = user._id === id;

  //Fetch One profile
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

  //Fetch all activities (as participant or creator) of this profile
  async function fetchActivity() {
    try {
      const response = await myApi.get(`/activities/${id}/user`);
      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchActivity();
  }, [id]);

  //Manage button delete activities
  const handleDelete = async (id) => {
    try {
      const res = await myApi.delete("/activities/" + id);
      setActivities(res.data);
      fetchActivity();
    } catch (error) {
      console.log(error);
    }
  };

  // Manage Follow or Unfollow button
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
  };

  if (!users) {
    return <p>Loading...</p>;
  }

  if (!activities) {
    return <p>No activity</p>;
  }

  //Manage Edit profile button
  const handleEditProfil = () => {
    navigate(`/${id}/edit`);
  };

  //Manage Create activity button
  const handleCreateActivity = () => {
    navigate(`/new-activity`);
  };

  return (
    <div className="profil">
      <div>
        <Avatar size="l" url={users.picture} />
      </div>
      <p>Firstname : {users.firstname}</p>
      <p>Lastname : {users.lastname}</p>
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
        const isMe = activity.creator._id === user._id;
        return (
          <div className="DisplayActivites" key={activity._id}>
            <Link to={`/activities/${activity._id}`}>
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
    </div>
  );
}

export default ProfilPage;
