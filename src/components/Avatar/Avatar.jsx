import React from "react";
import { useAuth } from "../../context/AuthContext";
function Avatar({ size, url }) {
  const { user } = useAuth();
  const table = {
    xs: "1.7rem",
    s: "3rem",
    m: "5rem",
    l: "10rem",
  };
  return (
    <div className="wrapper">
      <img
        style={{
          width: table[size],
          borderRadius: "50%",
        }}
        src={url}
        alt=""
      />
    </div>
  );
}

export default Avatar;
