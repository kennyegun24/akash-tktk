import React from "react";
import { IoInformationCircle } from "react-icons/io5";
import Switch from "@mui/material/Switch";

const CommercialAd = ({ commercialAd, brandType }) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <section className="flex width100 column gap05rem">
        <div className="flex align_center justify_between">
          <h4>Disclose video content</h4>
          <Switch name="ad" {...label} checked={commercialAd} />
        </div>
        <p>
          Turn on to disclose that this video promotes goods or services in
          exchange for something of value. Your video could promote yourself, a
          thirdparty, or both
        </p>
        {commercialAd && (
          <div className="info_div flex gap05rem">
            <IoInformationCircle className="info" size={16} />
            <p>
              Your video will be labeled 'Promotional Content'.
              <br />
              This cannot be changed once your video is posted
            </p>
          </div>
        )}
      </section>
      {commercialAd && (
        <>
          <section className="flex width100 column gap05rem">
            <div className="flex align_center justify_between">
              <h4>Your brand</h4>
              <input
                type="checkbox"
                name="personal"
                className="agree_check"
                id=""
              />
            </div>
            <p>
              You are promoting yourself or your own business. This video will
              be classified as brand organic
            </p>
          </section>
          <section className="flex width100 column gap05rem">
            <div className="flex align_center justify_between">
              <h4>Branded content</h4>
              <input
                type="checkbox"
                name="others"
                className="agree_check"
                id=""
              />
            </div>
            <p>
              You are promoting another brand or a third party. This video will
              be classified as branded organic
            </p>
          </section>
        </>
      )}
      <p className="agree">
        By posting, you agree to our{" "}
        <a
          className="agree_link"
          href={
            brandType.personal && brandType.others === true
              ? "https://www.tiktok.com/legal/page/global/bc-policy/en"
              : brandType.personal
              ? "https://www.tiktok.com/legal/page/global/music-usage-confirmation/en"
              : brandType.others
              ? "https://www.tiktok.com/legal/page/global/bc-policy/en"
              : "https://www.tiktok.com/legal/page/global/music-usage-confirmation/en"
          }
        >
          {brandType.personal && brandType.others === true
            ? "Branded Content Policy."
            : brandType.personal
            ? "Music Usage Confirmation"
            : brandType.others
            ? "Branded Content Policy."
            : "Music Usage Confirmation"}
        </a>{" "}
        {brandType.others && (
          <span className="flex gap03rem">
            and
            <a
              className="agree_link"
              href={"https://www.tiktok.com/legal/page/global/bc-policy/en"}
            >
              {brandType.others && "Music Usage Confirmation"}
            </a>
          </span>
        )}
      </p>
    </>
  );
};

export default CommercialAd;
