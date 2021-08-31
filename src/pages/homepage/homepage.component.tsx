import React, { useState, useEffect } from "react";
import "./homepage.styles.scss";

import { dbService } from "../../firebase/firebase";

import Postings from "../../components/postings/postings.component";

interface UserObj {
  userObj: any;
}

const Homepage: React.FC<UserObj> = (userObj) => {
  const [postings, setPostings] = useState<any>([]);
  useEffect(() => {
    dbService
      .collection("postings")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const postingArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostings(postingArray);
      });
  }, []);
  return (
    <div className="homepage">
      <div className="homepage__container">
        {postings.map((postings: any) => (
          <Postings
            key={postings.id}
            postingObj={postings}
            isLoggedIn={Boolean(userObj)}
            isOwner={Boolean(postings.creatorId === userObj.userObj.uid)}
            userObj={userObj.userObj}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
