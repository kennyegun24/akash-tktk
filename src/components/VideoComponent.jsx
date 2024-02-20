import React, { useRef, useState } from "react";
// import video from "../assets/video1.mp4";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrLinkNext, GrMultimedia } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { add_details } from "../redux/video";

const VideoComponent = ({ setPage, setFileSize }) => {
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const play = () => {
    video && videoRef.current.play();
    video && setIsPlaying(true);
  };
  const pause = () => {
    video && videoRef.current.pause();
    video && setIsPlaying(false);
  };
  videoRef.current?.addEventListener("timeupdate", () => {
    setProgress(
      (videoRef.current?.currentTime / videoRef.current?.duration) * 100
    );
  });

  videoRef.current?.addEventListener("ended", () => {
    setIsPlaying(false);
  });

  const dispatch = useDispatch();
  const nextPage = () => {
    if (video) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const bufferData = e.target.result;
        dispatch(
          add_details({
            bufferData,
          })
        );
        setPage(1);
      };
      reader.readAsArrayBuffer(video);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    const videoObjectURL = URL.createObjectURL(file);
    videoRef.current.src = videoObjectURL;

    const videoElement = document.createElement("video");
    videoElement.src = videoObjectURL;

    videoElement.onloadedmetadata = () => {
      setFileSize({
        size: file?.size,
        videoTime: videoElement.duration,
      });
    };
  };

  return (
    <div className="video_comp flex column justify_center align_center">
      <div className="user_name light_name">Kenny Egun</div>
      <div className="flex justify_between width100">
        <label
          className="new_video_label flex align_center gap03rem"
          htmlFor="file"
        >
          {/* <button className="flex align_center gap03rem"> */}
          <GrMultimedia size={26} color="#000" />
          <p style={{ fontSize: "14px" }}>New Video</p>
          {/* </button> */}
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          name=""
          id="file"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <div className="video_player flex column gap05rem align_center justify_center">
        <video ref={videoRef}></video>
        <div className="progress flex justify_center">
          <div className="progressBar" />
          <div className="progressTrack" style={{ width: `${progress}%` }} />
        </div>
        {isPlaying ? (
          <div
            onClick={pause}
            className="control_btn flex justify_center align_center"
          >
            <FaPause className="play_btn" />
          </div>
        ) : (
          <div
            onClick={play}
            className="control_btn flex justify_center align_center"
          >
            <FaPlay className="play_btn" />
          </div>
        )}
      </div>
      <button
        onClick={nextPage}
        className={`video_nxt_btn ${video ? "blue" : "dummy_color"}`}
      >
        <GrLinkNext />
      </button>
    </div>
  );
};

export default VideoComponent;
