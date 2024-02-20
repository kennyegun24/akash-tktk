import React, { useState } from "react";
import VideoComponent from "../../components/VideoComponent";
import VideoDetails from "../../components/VideoDetails";

const Home = () => {
  const [page, setPage] = useState(0);
  const [fileSize, setFileSize] = useState({ size: null, videoTime: null });
  return (
    <div>
      {page === 0 ? (
        <VideoComponent setFileSize={setFileSize} setPage={setPage} />
      ) : (
        <VideoDetails fileSize={fileSize} setPage={setPage} />
      )}
    </div>
  );
};

export default Home;
