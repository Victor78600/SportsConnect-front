import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import myApi from "./../service/service.js";
// import Avatar from "../components/Avatar/Avatar.jsx"

function ActivityPage() {
  const [activity, setActivity] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  // const { user } = useAuth();

  async function fetchActivity() {
    try {
      const response = await myApi.get(`/activities/${id}`);
      setActivity(response.data);
      console.log(activity);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchActivity();
  }, [id]);

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await myApi.delete("/activities/" + id);
  //     await fetchProfil();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (!activity) {
    return <p>No activity</p>;
  }
  return (
    <div>
      <p>Sports: {activity.sports} </p>
      <p>City: {activity.city} </p>
      <p>Description: {activity.description} </p>
      <p>Duration: {activity.duration} </p>
    </div>
  );
}

export default ActivityPage;
