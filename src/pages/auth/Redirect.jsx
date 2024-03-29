import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/auth";

const Redirect = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");
    if (code) {
      const makeReq = async () => {
        try {
          const req = await axios.post(
            "https://akash-tktk-server.vercel.app/oauth/redirect",
            {
              code: code,
            }
          );
          const res = await req.data;
          // console.log(res);
          if (res) {
            dispatch(loginSuccess(res));
          }
        } catch (error) {
          console.log(error);
        }
      };
      makeReq();
    }
  }, []);

  return <div>Redirect page</div>;
};

export default Redirect;
