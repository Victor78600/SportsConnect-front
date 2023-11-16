import { useState, useEffect } from "react";
import myApi from "../service/service.js";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function UserLayout() {
  const [allActivities, setAllActivities] = useState(null);
  const { user } = useAuth();

  const fetchAllActivities = async () => {
    try {
      const res = await myApi.get("/activities");
      setAllActivities(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllActivities();
  }, []);
  if (!allActivities) {
    return <p>Loading...</p>;
  }

  console.log(allActivities);
  return (
    <div>
      <div
        style={{
          width: "10rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          position: "absolute",
          left: "2rem",
        }}
      >
        {allActivities.map((activity) => {
          const participant = activity.participants.find(
            (userEl) => userEl.username !== user.username
          );
          return (
            <Link key={activity._id} to={`/activities/${activity._id}`}>
              Activity between you and {participant.username}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}

export default UserLayout;
