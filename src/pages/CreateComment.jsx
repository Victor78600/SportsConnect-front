import React, { useRef, useState } from "react";
import myApi from "./../service/service.js";
import { useAuth } from "./../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

function CreateComment() {
  const contentInput = useRef();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleCreateComment(event) {
    event.preventDefault();
    const content = contentInput.current.value;
    const activity = id;
    const creator = user;

    try {
      const res = await myApi.post(`/activities/${id}/comments`, {
        content,
        activity,
        creator,
      });
      navigate(`/activities/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="FormPages">
      <h2>Add a comment</h2>

      <form className="Form">
        <div className="FormElement">
          <label htmlFor="content">Your comment</label>
          <br />
          <textarea
            className="InputCreate"
            id="content"
            name="content"
            rows="4"
            ref={contentInput}
            required
          ></textarea>
        </div>
        <div className="FormElement">
          <button onClick={handleCreateComment}>Comment</button>
        </div>
      </form>
    </div>
  );
}

export default CreateComment;
