import { useState, useEffect, useRef } from "react";
import myApi from "./../../service/service.js";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserDisplayer() {
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  // async function handleClickSearch() {
  //   console.log(selectedUser);
  //   const user = allUsers.find((user) => user.username === selectedUser);
  //   try {
  //     const response = await myApi.post("/activities", { id: user._id });
  //     console.log("success", response);
  //     setError("Activity created");
  //   } catch (error) {
  //     setError(error.response.data.message);
  //   }
  // }

  if (!allUsers) {
    return <p>Loading...</p>;
  }

  const handleClickSearch = () => {
    console.log(selectedUser);
    navigate(`/${selectedUser}`);
  };

  const handleCreateActivity = () => {
    navigate("/new-activity");
  };
  return (
    <div className="form">
      <div>
        {/* <pre>{JSON.stringify(allUsers, null, 2)}</pre> */}
        <p>{error}</p>
        <input
          type="text"
          list="all-users"
          value={selectedUser.username}
          onChange={(e) => {
            console.log(e.target);
            setSelectedUser(e.target.value);
          }}
        />

        <datalist id="all-users">
          {allUsers.map((user) => (
            <option key={user._id} value={user.username}>
              {user.firstname} {user.lastname}
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
      <p>Last activities of your friends </p>
    </div>
  );
}

export default UserDisplayer;
