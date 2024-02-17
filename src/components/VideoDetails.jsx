import React from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { FaRegPaperPlane } from "react-icons/fa";

const VideoDetails = ({ setPage, fileSize }) => {
  return (
    <div className="video_details flex column gap1rem">
      <div className="dark_name">Kenny Egun</div>
      <p>File size: {(fileSize / 1000000).toFixed(2)}mb</p>
      <form className=" flex column gap1rem">
        <section className="flex column gap03rem">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Title" />
        </section>

        <div className="flex justify_between">
          <section className="flex column privacy gap03rem">
            <label htmlFor="privacy">Privacy</label>
            <select name="" id="privacy">
              <option value="false">Self Only</option>
              <option value="true">Everyone</option>
            </select>
          </section>

          <section className="flex column privacy gap03rem">
            <label htmlFor="comments">Disable Comments</label>
            <select name="" id="comments">
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </section>
        </div>

        <section className="flex column gap03rem">
          <label htmlFor="disable_duet">Disable Duet?</label>
          <select name="" id="disable_duet">
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </section>
        <section className="flex column gap03rem">
          <label htmlFor="disable_stitch">Disable Stitch</label>
          <select name="" id="disable_stitch">
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </section>
        <input type="text" name="" id="" value="Kenny" disabled />
      </form>
      <div className="flex video_details_btn_div">
        <button onClick={() => setPage(0)} className="video_back_btn">
          <GrLinkPrevious />
        </button>
        <button onClick={() => setPage(1)} className="video_back_btn">
          <FaRegPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default VideoDetails;
