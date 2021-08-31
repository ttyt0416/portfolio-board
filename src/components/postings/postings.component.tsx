import React from "react";
import "./postings.styles.scss";

import { dbService, storageService } from "../../firebase/firebase";

interface PostInfo {
  postingObj: any;
  isLoggedIn: boolean;
  isOwner: boolean;
  userObj: any;
}

const Postings: React.FC<PostInfo> = ({
  postingObj,
  isLoggedIn,
  isOwner,
  userObj,
}) => {
  return (
    <div className="postings">
      <img alt="" src={postingObj.attachmentUrl} className="postings__image" />
      <div className="postings__content">
        <p className="postings__title">{postingObj.title}</p>
        <p className="postings__text">{postingObj.text}</p>
      </div>
    </div>
  );
};

export default Postings;
