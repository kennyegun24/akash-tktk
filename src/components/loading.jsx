import React from "react";

const Loading = () => {
  return (
    <div className="loading_div flex column gap1rem justify_center align_center">
      <div className="loader" />
      <p style={{ color: "#fff" }}>Loading...</p>
    </div>
  );
};

export default Loading;
