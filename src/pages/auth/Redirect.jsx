import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/auth";

const Redirect = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    try {
      const code = urlSearchParams.get("code");
      if (code) {
        const makeReq = async () => {
          const req = axios.post("http://localhost:4000/oauth/redirect", {
            code: code,
          });
          const res = await req.data;
          if (res) {
            dispatch(loginSuccess({ token: res.access_token }));
          }
        };
        makeReq();
      }
    } catch (error) {}
  }, []);

  return <div>Redirect page</div>;
};

export default Redirect;
