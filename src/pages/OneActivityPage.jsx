import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import myApi from "./../service/service.js";
import { useNavigate } from "react-router-dom";
// import Avatar from "../components/Avatar/Avatar.jsx"

function ActivityPage() {
  const [activity, setActivity] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  async function fetchActivity() {
    try {
      const response = await myApi.get(`/activities/${id}`);
      setActivity(response.data);
      // console.log(activity);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchActivity();
  }, [id]);

  async function fetchComments() {
    try {
      const response = await myApi.get(`/activities/${id}/comments`);
      setComments(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchComments();
  }, [id]);

  if (!activity) {
    return <p>No activity</p>;
  }

  if (!comments) {
    return <p>No comments</p>;
  }

  const handleDeleteComment = async (id) => {
    try {
      const res = await myApi.delete("/comments/" + id);
      await fetchActivity();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      const res = await myApi.delete("/activities/" + id);
      await fetchActivity();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateComment = () => {
    navigate(`comment`);
  };

  const handleEditActivity = () => {
    navigate(`edit`);
  };

  return (
    <div>
      <p>Sports: {activity.sports} </p>
      <p>City: {activity.city} </p>
      <p>Description: {activity.description} </p>
      <p>Duration: {activity.duration} </p>
      {activity.creator === user._id && (
        <button onClick={() => handleEditActivity(activity._id)}>Edit</button>
      )}
      {activity.creator === user._id && (
        <button onClick={() => handleDeleteActivity(activity._id)}>
          Delete
        </button>
      )}
      <h3
        style={{
          marginTop: "30px",
        }}
      >
        Comments
      </h3>
      {comments.map((comment) => {
        const isMe = comment.creator === user._id;
        return (
          <div
            key={comment._id}
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{comment.content} </p>
            <p>Creator: {comment.creator}</p>
            {isMe && (
              <div onClick={() => handleDeleteComment(comment._id)}>🗑️</div>
            )}
          </div>
        );
      })}
      <button className="CreateComment" onClick={handleCreateComment}>
        Add a comment
      </button>
    </div>
  );
}

export default ActivityPage;
