import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import myApi from "./../service/service.js";
import { useNavigate } from "react-router-dom";
import "./OneActivityPage.css";
import Avatar from "../components/Avatar/Avatar.jsx";
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
      await fetchComments();

      // setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      const res = await myApi.delete("/activities/" + id);
      await fetchActivity();
      navigate(`/${user._id}`);
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
    <div className="OneActivityDisplay">
      <div>
        <div className="Creator">
          <p className="CreatorName">
            Activity created by {activity.creator.firstname}{" "}
            {activity.creator.lastname}{" "}
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
                className="EachParticipantsOneActivity"
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
          console.log(comment.creator);
          console.log(user._id);
          const isMe = comment.creator._id === user._id;
          return (
            <div className="DisplayComment" key={comment._id}>
              <div>
                <div className="EachParticipantsOneActivity">
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
    </div>
  );
}

export default ActivityPage;
