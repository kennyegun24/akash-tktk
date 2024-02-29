import React from "react";
import { PiSmileyWinkFill } from "react-icons/pi";
import { BsHandThumbsUpFill } from "react-icons/bs";

const UploadSuccess = () => {
  return (
    <div className="upload_success_container flex align_center justify_center column gap1rem">
      <h3>Video has been successfully uploaded!</h3>
      <BsHandThumbsUpFill className="success_redirect_emoji" />
      <button className="success_redirect_home_btn">Home Page</button>
    </div>
  );
};

export default UploadSuccess;
