import React from "react";
import styles from "./Users.module.css";
import * as axios from "axios";
import userPhoto from "../../assets/images/user.png";

let Users = (props) => {
  if (props.users.length === 0) {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        props.setUsers(response.data.items);
      });

    // props.setUsers([
    //   {
    //     id: 1,
    //     followed: false,
    //     fullNmae: "Dmitry",
    //     status: "I am a boss",
    //     location: { city: "Minsk", country: "Belarus" },
    //     photoUrl:
    //       "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dmitry_Nagiev_2017_3.jpg",
    //   },
    //   {
    //     id: 2,
    //     followed: true,
    //     fullNmae: "Sasha",
    //     status: "I am a boss too",
    //     location: { city: "Moscow", country: "Russia" },
    //     photoUrl:
    //       "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dmitry_Nagiev_2017_3.jpg",
    //   },
    //   {
    //     id: 3,
    //     followed: false,
    //     fullNmae: "Andrew",
    //     status: "I am a boss too",
    //     location: { city: "Minsk", country: "Belarus" },
    //     photoUrl:
    //       "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dmitry_Nagiev_2017_3.jpg",
    //   },
    // ]);
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img
                src={u.photos.small !== null ? u.photos.small : userPhoto}
                alt=""
                className={styles.userPhoto}
              />
            </div>
            <div>
              {u.followed ? (
                <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
              ) : (
                <button onClick={() => props.follow(u.id)}>Follow</button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.city"}</div>
              <div>{"u.location.country"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
