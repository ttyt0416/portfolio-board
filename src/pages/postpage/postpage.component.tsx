import React, { useState } from "react";
import "./postpage.styles.scss";

import { useHistory } from "react-router";

import { storageService, dbService } from "../../firebase/firebase";

import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserInfo {
  userObj: any;
}

const Postpage: React.FC<UserInfo> = (userObj) => {
  const userInfo = userObj.userObj;
  const [attachment, setAttachment] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  let history = useHistory();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userInfo.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const postingObj = {
      title: title,
      text: text,
      liked: new Array(),
      createdAt: Date.now(),
      creatorId: userInfo.uid,
      attachmentUrl,
    };
    await dbService.collection("postings").add(postingObj);
    setTitle("");
    setText("");
    setAttachment("");
    history.push("/");
  };

  const onTitleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };

  const onTextChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    // const theFile = [files];
    const reader = new FileReader();
    reader.onloadend = (progressEvent) => {
      const result = progressEvent.target!.result;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  console.log(attachment);

  const onClearAttachment = () => setAttachment(null);

  return (
    <div className="postpage">
      {/* {attachment && (
        <img className="postpage__image" alt="" src={attachment} />
      )} */}
      <div className="postpage__container">
        <form className="postpage__post" onSubmit={onSubmit}>
          <h1 className="postpage__post-headline">Post</h1>
          <input
            type="text"
            required
            className="postpage__post-title"
            placeholder="Title"
            onChange={onTitleChange}
          />
          <label htmlFor="post-file" className="postpage__post-label">
            {attachment === undefined ? (
              "Select Image"
            ) : (
              <img className="postpage__post-image" alt="" src={attachment} />
            )}
          </label>
          <input
            id="post-file"
            type="file"
            required
            className="postpage__post-file"
            multiple
            accept="image/*"
            onChange={onFileChange}
          />
          <textarea
            rows={10}
            required
            className="postpage__post-text"
            onChange={onTextChange}
          />
          <input
            className="postpage__post-submit"
            type="submit"
            value="SUBMIT"
          />
        </form>
      </div>
    </div>
  );
};

export default Postpage;
