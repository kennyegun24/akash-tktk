import React, { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { FaRegPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "./loading";
import Switch from "@mui/material/Switch";
import { IoIosArrowBack } from "react-icons/io";

const VideoDetails = ({ setPage, fileSize }) => {
  const { video_details } = useSelector((state) => state.video);
  const [loading, setLoading] = useState(false);
  const [resumableUrl, setResumableUrl] = useState(null);
  const { currentUser } = useSelector((state) => state.auth);
  const [userVideoDetails, setUserVideoDetails] = useState({
    title: "",
    privacy_level: false,
    disable_duet: currentUser?.getUserInfo?.data?.duet_disabled,
    disable_stitch: currentUser?.getUserInfo?.data?.stitch_disabled,
    disable_comments: currentUser?.getUserInfo?.data?.comment_disabled,
    video_cover_timestamp_ms: 1000,
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleChange = (e) => {
    // const title = e.target.elements.title;
    console.log(e.target);
    if (e.target.name === "title") {
      const title = e.target.value;
      if (title.length <= 100) {
        setUserVideoDetails((prevDetails) => ({
          ...prevDetails,

          [e.target.name]: e.target.value,
        }));
      }
    } else {
      setUserVideoDetails((prevDetails) => ({
        ...prevDetails,

        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const initializeUploadToTiktokApi = async () => {
        const axiosCreate = axios.create({
          baseURL: "https://open.tiktokapis.com/v2/",
          headers: {
            Authorization: `Bearer ${currentUser?.access_token}`,
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
                Authorization: `Bearer ${currentUser?.access_token}`,
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
  // console.log(video_details.bufferData);
  const max_video_post_duration_sec = 600;
  // console.log(fileSize);
  if (fileSize.videoTime > max_video_post_duration_sec) {
  }

  return (
    <section className="flex column gap1rem">
      <div className="flex gap1rem align_center back_nav">
        <div onClick={() => setPage(0)} className="back_arrow">
          <IoIosArrowBack />
        </div>
        <p>Upload to Tiktok</p>
      </div>
      <div className="video_details flex column gap2rem">
        {loading && <Loading />}
        <div className="dark_name flex align_center gap05rem">
          <img
            src={currentUser?.getUserInfo?.data?.creator_avatar_url}
            className="image"
          />
          <p>{currentUser?.getUserInfo?.data?.creator_nickname}</p>
        </div>
        <p>File size: {(fileSize.size / 1000000).toFixed(2)}mb</p>
        <form
          onChange={(e) => handleChange(e)}
          className=" flex column gap2rem"
        >
          <section className="flex column gap03rem">
            <label htmlFor="title">Caption</label>
            <div className="title_container flex column gap05rem">
              <input
                className="title width100"
                type="text"
                name="title"
                id="title"
                placeholder="Write a caption"
                value={userVideoDetails.title}
              />
              <p>{userVideoDetails.title.length}/100</p>
            </div>
          </section>

          <div className="flex justify_between">
            <section className="flex width100 column privacy gap03rem">
              <label htmlFor="privacy">Who can view this video?</label>
              <select className="width100" name="" id="privacy">
                <option value="FOLLOWER_OF_CREATOR">Follower of creator</option>
                <option value="MUTUAL_FOLLOW_FRIENDS">Mutual Friends</option>
                <option value="SELF_ONLY">Self</option>
              </select>
            </section>
          </div>

          <section className="flex width100 column gap05rem">
            <h4>Allow users to</h4>
            <div className="flex width100 gap1rem">
              <section className="flex align_center privacy gap03rem">
                <input type="checkbox" />{" "}
                <label htmlFor="disable_duet">Duet?</label>
              </section>
              <section className="flex align_center privacy gap03rem">
                <input type="checkbox" />{" "}
                <label htmlFor="disable_stitch">Stitch</label>
              </section>
              <section className="flex align_center privacy gap03rem">
                <input type="checkbox" />{" "}
                <label htmlFor="comments">Comment</label>
              </section>
            </div>
          </section>

          <section className="promotion flex width100 column gap1rem">
            <section className="flex width100 column gap05rem">
              <div className="flex align_center justify_between">
                <h4>Disclose video content</h4>
                <Switch {...label} />
              </div>
              <p>
                Turn on to disclose that this video promotes goods or services
                in exchange for something of value. Your video could promote
                yourself, a thirdparty, or both
              </p>
            </section>
            <section className="flex width100 column gap05rem">
              <div className="flex align_center justify_between">
                <h4>Your brand</h4>
                <Switch {...label} />
              </div>
              <p>
                You are promoting yourself or your own business. This video will
                be classified as brand organic
              </p>
            </section>
            <section className="flex width100 column gap05rem">
              <div className="flex align_center justify_between">
                <h4>Branded content</h4>
                <Switch {...label} />
              </div>
              <p>
                You are promoting another brand or a third party. This video
                will be classified as branded organic
              </p>
            </section>
            <p className="agree">
              By posting, you agree to our{" "}
              <a className="agree_link" href="/">
                Music Usage Confirmation
              </a>
            </p>
            <button className="width100 upload_btn" type="submit">
              Upload
            </button>
          </section>
        </form>
        {/* <div className="flex video_details_btn_div">
        <button onClick={() => setPage(0)} className="video_back_btn">
          <GrLinkPrevious />
        </button>
        <button onClick={handleSubmit} className="video_back_btn">
          <FaRegPaperPlane />
        </button>
      </div> */}
      </div>
    </section>
  );
};

export default VideoDetails;
