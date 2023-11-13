import React from "react";
import { useAuth } from "../../context/AuthContext";
function Avatar({ size, url }) {
  const { user } = useAuth();
  const table = {
    s: "3rem",
    m: "5rem",
    l: "7rem",
  };
  return (
    <div className="wrapper">
      <img
        style={{
          width: table[size],
        }}
        src={url}
        alt=""
      />
    </div>
  );
}

export default Avatar;
