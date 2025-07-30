import type { FC } from "react";

import ProfileInfo from "../../shared/components/ProfileInfo/ProfileInfo";
import ProfileTape from "../../shared/components/ProfileTape/ProfileTape";

import styles from "./MyProfile.module.css";

const MyProfile: FC = ()=>{
    return (
        <div className={styles.container}>
            <ProfileInfo />
            <ProfileTape />
        </div>
    )
};

export default MyProfile;