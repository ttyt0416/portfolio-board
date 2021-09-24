import React, { useState, useEffect } from "react";
import "./homepage.styles.scss";

import { dbService } from "../../firebase/firebase";

import Postings from "../../components/postings/postings.component";

interface UserObj {
  userObj: any;
}

const Homepage: React.FC<UserObj> = (userObj) => {
  const [postings, setPostings] = useState<any>([]);

  //get data of posted postings from firebase when page is loaded
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
      <div className="homepage__flexhelper"></div>
      <div className="homepage__postings">
        {postings.map((postings: any) => (
          <Postings
            key={postings.id}
            postingObj={postings}
            isOwner={
              userObj.userObj == null
                ? false
                : postings.creatorId === userObj.userObj.uid
            }
          />
        ))}
      </div>
      <div className="homepage__flexhelper"></div>
    </div>
  );
};

export default Homepage;
