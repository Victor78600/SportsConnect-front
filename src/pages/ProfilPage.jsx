import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useParams } from "react-router-dom";
import myApi from "./../service/service.js";
// import Avatar from "../components/Avatar/Avatar.jsx"

function ProfilPage() {
  const [activities, setActivities] = useState(null);
  // const [activity, setActivity] = useState("");
  const [user, setUser] = useState(null);
  const { id } = useParams();
  // const { user } = useAuth();

  async function fetchProfil() {
    try {
      const response = await myApi.get(`/users/${id}`);
      setUser(response.data);
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
  // const handleDelete = async (id) => {
  //   try {
  //     const res = await myApi.delete("/activities/" + id);
  //     await fetchProfil();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!activities) {
    return <p>No activity</p>;
  }
  return (
    <div className="profil">
      <p>Prénom : {user.firstname}</p>
      <p>Nom : {user.lastname}</p>

      {activities.map((activity) => {
        // const isMe = activity.creator._id === user._id;
        // const side = isMe ? "marginLeft" : "marginRight";
        // console.log(activity.creator);
        return (
          <Link to={`/activities/${activity._id}`} key={activity._id}>
            {/* <div>
              <Avatar size="s" url={activity.creator.picture} />
            </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>{activity.city} </p>
              <p>{activity.description} </p>
              <p>{activity.duration} </p>
              <p>{activity.sports} </p>
              {/* {isMe && <div onClick={() => handleDelete(activity._id)}>🗑️</div>} */}
            </div>
          </Link>
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
