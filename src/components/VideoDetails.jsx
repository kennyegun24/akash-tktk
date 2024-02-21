import React, { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { FaRegPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "./loading";
import { IoIosArrowBack } from "react-icons/io";
import CommercialAd from "./CommercialAd";
import VideoLengthError from "./VideoLengthError";

const VideoDetails = ({ setPage, fileSize }) => {
  const { video_details } = useSelector((state) => state.video);
  const [loading, setLoading] = useState(false);
  const [resumableUrl, setResumableUrl] = useState(null);
  const { currentUser } = useSelector((state) => state.auth);
  const [commercialAd, setCommercialAd] = useState(false);
  const [brandType, setBrandType] = useState({
    terms: "Music Usage Confirmation.",
    personal: null,
    others: null,
  });
  const [userVideoDetails, setUserVideoDetails] = useState({
    title: "",
    privacy_level: null,
    disable_duet: currentUser?.getUserInfo?.data?.duet_disabled,
    disable_stitch: currentUser?.getUserInfo?.data?.stitch_disabled,
    disable_comments: currentUser?.getUserInfo?.data?.comment_disabled,
    video_cover_timestamp_ms: 1000,
  });
  const [error, setError] = useState({});
  const max_video_post_duration_sec = 600;

  const handleChange = (e) => {
    // const title = e.target.elements.title;
    // console.log(e.target);
    if (e.target.name === "title") {
      const title = e.target.value;
      if (title.length <= 100) {
        setUserVideoDetails((prevDetails) => ({
          ...prevDetails,

          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "ad") {
      setCommercialAd((prev) => !prev);
    } else if (e.target.name === "personal") {
      setBrandType((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else if (e.target.name === "others") {
      setBrandType((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setUserVideoDetails((prevDetails) => ({
        ...prevDetails,

        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};
    if (userVideoDetails.privacy_level === null) {
      validationError.privacy = "Privacy must be set";
    }
    if (userVideoDetails.title.trim() === "") {
      validationError.title = "Caption is required";
    }
    if (fileSize.videoTime < max_video_post_duration_sec) {
      validationError.video = "Video length should not be more than 10mins";
    }
    setError(validationError);
    // try {
    //   setLoading(true);
    //   const initializeUploadToTiktokApi = async () => {
    //     const axiosCreate = axios.create({
    //       baseURL: "https://open.tiktokapis.com/v2/",
    //       headers: {
    //         Authorization: `Bearer ${currentUser?.access_token}`,
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     try {
    //       const req = await axiosCreate.post("/post/publish/video/init/", {
    //         ...userVideoDetails,
    //       });

    //       const response = await req.data;
    //       setResumableUrl(response.data.upload_url);

    //       if (response) {
    //         const axiosCreate = axios.create({
    //           baseURL: resumableUrl,
    //           headers: {
    //             Authorization: `Bearer ${currentUser?.access_token}`,
    //             "Content-Type": "video/mp4",
    //             "Content-Range": `bytes 0-${fileSize - 1}/${fileSize}`,
    //           },
    //         });
    //         const req = await axiosCreate.post("", {
    //           ...video_details.bufferData,
    //         });
    //       }
    //       setLoading(false);
    //     } catch (error) {
    //       setLoading(false);
    //     }
    //   };
    //   initializeUploadToTiktokApi();
    // } catch (error) {
    //   setLoading(false);
    // }
  };

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
        {error?.video && <VideoLengthError text={error?.video} />}
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
            {error?.title &&
              setTimeout(() => {
                setError({});
              }, 3000) && <p className="error">{error?.title}</p>}
          </section>

          <div className="flex justify_between">
            <section className="flex width100 column privacy gap03rem">
              <label htmlFor="privacy">Who can view this video?</label>
              <select className="width100" name="" id="privacy">
                <option value="FOLLOWER_OF_CREATOR">Follower of creator</option>
                <option value="MUTUAL_FOLLOW_FRIENDS">Mutual Friends</option>
                <option value="SELF_ONLY">Self</option>
              </select>
              {error?.privacy &&
                setTimeout(() => {
                  setError({});
                }, 3000) && <p className="error">{error?.privacy}</p>}
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
            <CommercialAd commercialAd={commercialAd} brandType={brandType} />
            <button
              onClick={handleSubmit}
              className="width100 upload_btn"
              type="submit"
            >
              Upload
            </button>
          </section>
        </form>
      </div>
    </section>
  );
};

export default VideoDetails;
