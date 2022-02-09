import React from "react";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  return (
    <div>
      {/* <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />
      </div> */}
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="" />
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
