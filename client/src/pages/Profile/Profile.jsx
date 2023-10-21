import styles from "./Profile.module.scss";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";

// COMPONENTS
import { Button, Input } from "./../../components";

import ProfileOption from "./components/ProfileOption/ProfileOption";
import ProfileView from "./components/ProfileView/ProfileView";

// API
import useUser from "../../api/useUser";

import { images } from "../../constant";

const profileTabOption = {
  work: "work",
  liked_shots: "liked_shots",
  boosted_shots: "boosted_shots",
  collections: "collections",
  about: "about",
};

const Profile = () => {
  const [activeOption, setActiveOption] = useState(profileTabOption.work);
  const [userData, setUserData] = useState({});

  const { getUserData } = useUser();

  const handleEditProfile = () => {
    console.log("Edit profile");
  };

  useEffect(() => {
    getUserData((userResponse) => {
      toast.success(userResponse.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setUserData(userResponse.user);
    });
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profile_info}>
        <img src={images.nature} className={styles.profile_img} alt="" />
        <div className={styles.detail}>
          <h1 className={styles.name}>{userData?.name}</h1>
          <p className={styles.bio}>
            {userData?.bio
              ? userData?.bio
              : "UI / Visual Design, Product Design, UX Design / Research"}
          </p>
        </div>
        <div className={styles.action}>
          <Button
            onClick={handleEditProfile}
            className={styles.follow}
            buttonText="Follow"
          />
          <Button
            onClick={handleEditProfile}
            className={styles.edit}
            buttonText="Edit"
          />
        </div>
      </div>
      <div className={styles.profile_body}>
        <div className={styles.profile_body_nav}>
          <div className={styles.nav_items}>
            {Object.values(profileTabOption).map((option) => (
              <ProfileOption
                key={option}
                option={option}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
              />
            ))}
          </div>
          <Input className={styles.input} placeholder={"Search item here..."} />
        </div>
        <div className={styles.profile_body_view}>
          <ProfileView option={activeOption} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
