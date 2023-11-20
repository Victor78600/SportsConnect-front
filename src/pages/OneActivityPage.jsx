import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import myApi from "./../service/service.js";
import { useNavigate } from "react-router-dom";
import "./OneActivityPage.css";
import Avatar from "../components/Avatar/Avatar.jsx";

function ActivityPage() {
  const [activity, setActivity] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  //Fetch one activity
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

  // Fetch all comments
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
    return <p>Loading...</p>;
  }

  if (!comments) {
    return <p>Loading...</p>;
  }

  //button delete comment
  const handleDeleteComment = async (id) => {
    try {
      const res = await myApi.delete("/comments/" + id);
      // Update comments of the activity
      await fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete button of one activity
  const handleDeleteActivity = async (id) => {
    try {
      const res = await myApi.delete("/activities/" + id);
      await fetchActivity();
      navigate(`/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  //Manage button create comment
  const handleCreateComment = () => {
    navigate(`comment`);
  };

  // Manage button create activity
  const handleEditActivity = () => {
    navigate(`edit`);
  };

  return (
    <div className="OneActivityDisplay">
      <div>
        <div className="Creator">
          <p className="CreatorName">
            Activity created by{" "}
            <span
              className="UserPath"
              onClick={() => navigate(`/${activity.creator._id}`)}
            >
              {activity.creator.firstname} {activity.creator.lastname}
            </span>
          </p>
          <div className="OneActivityAvatar">
            <Avatar size="s" url={activity.creator.picture} />
          </div>
        </div>
        <div className="Activityinfos">
          <p>Sports: {activity.sports} </p>
          <p>City: {activity.city} </p>
          <p>Duration: {activity.duration}h </p>
        </div>
        <div className="ActivityDescription">
          <p>Description: {activity.description} </p>
        </div>
        <div className="ParticipantsOneActivity">
          <p>Participants:</p>
          {activity.participants.map((participant) => {
            return (
              <div
                className="EachParticipantsOneActivity UserPath"
                onClick={() => navigate(`/${participant._id}`)}
                key={participant._id}
              >
                <Avatar size="xs" url={participant.picture} />
                <p id="NameParticipants">
                  {participant.firstname} {participant.lastname}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3
          style={{
            marginTop: "10px",
          }}
        >
          Comments
        </h3>
        {comments.map((comment) => {
          const isMe = comment.creator._id === user._id;
          return (
            <div className="DisplayComment" key={comment._id}>
              <div>
                <div
                  className="EachParticipantsOneActivity UserPath"
                  onClick={() => navigate(`/${comment.creator._id}`)}
                >
                  <Avatar size="xs" url={comment.creator.picture} />
                  <p id="NameParticipants">
                    {comment.creator.firstname} {comment.creator.lastname}
                  </p>
                </div>
                <p id="CommentsContent">{comment.content} </p>
              </div>

              {isMe && (
                <button
                  id="DeleteComment"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  🗑️
                </button>
              )}
            </div>
          );
        })}
        <button className="CreateComment" onClick={handleCreateComment}>
          Add a comment
        </button>
      </div>
      {activity.creator._id === user._id && (
        <button onClick={() => handleEditActivity(activity._id)}>
          Edit the Activity
        </button>
      )}
      {activity.creator._id === user._id && (
        <button onClick={() => handleDeleteActivity(activity._id)}>
          Delete the Activity
        </button>
      )}
      <button
        id="BackButton"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default ActivityPage;
