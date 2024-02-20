import React, { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { FaRegPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "./loading";

const VideoDetails = ({ setPage, fileSize }) => {
  const { video_details } = useSelector((state) => state.video);
  const [loading, setLoading] = useState(false);
  const [userVideoDetails, setUserVideoDetails] = useState({
    title: "",
    privacy_level: false,
    disable_duet: false,
    disable_stitch: false,
    disable_comments: false,
    video_cover_timestamp_ms: 1000,
  });
  const [resumableUrl, setResumableUrl] = useState(null);
  const { currentUser } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUserVideoDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const initializeUploadToTiktokApi = async () => {
        const axiosCreate = axios.create({
          baseURL: "https://open.tiktokapis.com/v2/",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        });

        try {
          const req = await axiosCreate.post("/post/publish/video/init/", {
            ...userVideoDetails,
          });

          const response = await req.data;
          setResumableUrl(response.data.upload_url);

          if (response) {
            const axiosCreate = axios.create({
              baseURL: resumableUrl,
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
                "Content-Type": "video/mp4",
                "Content-Range": `bytes 0-${fileSize - 1}/${fileSize}`,
              },
            });
            const req = await axiosCreate.post("", {
              ...video_details.bufferData,
            });
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      initializeUploadToTiktokApi();
    } catch (error) {
      setLoading(false);
    }
  };
  console.log(video_details.bufferData);

  return (
    <div className="video_details flex column gap1rem">
      {loading && <Loading />}
      <div className="dark_name">Kenny Egun</div>
      <p>File size: {(fileSize / 1000000).toFixed(2)}mb</p>
      <form onChange={(e) => handleChange(e)} className=" flex column gap1rem">
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
        <button onClick={handleSubmit} className="video_back_btn">
          <FaRegPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default VideoDetails;
