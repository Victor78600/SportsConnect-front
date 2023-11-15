import { useState, useEffect, useRef } from "react";
import myApi from "./../service/service";

function SelectedUserId() {
  const [user, setUser] = useState(null);
  const fetchUserSelected = async () => {
    try {
      const response = await myApi.get(`/users/user/${username}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserSelected();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <p>{user._id}</p>;
}

export default SelectedUserId;
