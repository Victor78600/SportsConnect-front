import React, { useRef, useState } from "react";
import myApi from "./../service/service.js";
import { useAuth } from "./../context/AuthContext";
import { useParams } from "react-router-dom";

function CreateComment() {
  const contentInput = useRef();
  const { id } = useParams();
  const { user } = useAuth();

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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Add a comment</h1>

      <form>
        <label htmlFor="content">Comment:</label>
        <textarea
          id="content"
          name="content"
          rows="4"
          ref={contentInput}
          required
        ></textarea>

        <button onClick={handleCreateComment}>Comment</button>
      </form>
    </div>
  );
}

export default CreateComment;
