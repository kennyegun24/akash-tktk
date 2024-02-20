import React from "react";
import Loading from "../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
    <div className="justify_center flex column gap1rem align_center height100">
      <h2>Login to your Tiktok account</h2>
      <button onClick={request_token} className="signin_button">
        Signin with Oauth2
      </button>
      <div className="flex column align_center gap05rem">
        <p className="privacy_policy">Privacy policy</p>
        <p className="privacy_policy">Terms of service</p>
      </div>
      {loginStatus === "loading" && <Loading />}
    </div>
  );
};

export default Login;
