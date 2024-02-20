import React from "react";
import Loading from "../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaTiktok } from "react-icons/fa6";

const Login = () => {
  const { loginStatus } = useSelector((state) => state.auth);
  const request_token = async () => {
    try {
      const response = await axios.get(
        "https://akash-tktk-server.vercel.app/login"
      );
      window.location.href = `${response.data.url}`;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="justify_center flex column gap2rem align_center height100">
      <h2>AJL Media</h2>
      <div className="justify_center flex column gap1rem align_center width100">
        <button
          onClick={request_token}
          className="signin_button flex justify_between"
        >
          <FaTiktok size={16} />
          <p className="cont">Continue with Tiktok</p>
        </button>
        <div className="flex column align_center gap05rem">
          <p className="privacy_policy">Privacy policy</p>
          <p className="privacy_policy">Terms of service</p>
        </div>
        {loginStatus === "loading" && <Loading />}
      </div>
    </div>
  );
};

export default Login;
