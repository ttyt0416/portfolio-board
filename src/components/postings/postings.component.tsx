import React, { useState } from "react";
import "./postings.styles.scss";

import { dbService, storageService } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

interface PostInfo {
  postingObj: any;
  isOwner: boolean;
}

const Postings: React.FC<PostInfo> = ({ postingObj, isOwner }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editAttach, setEditAttach] = useState<any>();
  const [editTitle, setEditTitle] = useState<string>("");
  const [editText, setEditText] = useState<string>("");

  const postDelete = async () => {
    const check = window.confirm("delete this post?");
    if (check) {
      await dbService.doc(`postings/${postingObj.id}`).delete();
      await storageService.refFromURL(postingObj.attachmentUrl).delete();
    }
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const onEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const body = {
      attachmentUrl: editAttach,
      title: editTitle,
      text: editText,
      editedAt: Intl.DateTimeFormat("ja-JP", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(Date.now()),
    };
    await dbService.doc(`postings/${postingObj.id}`).update(body);
    setEdit(false);
  };

  const onEditFile = (event: any) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    // const theFile = [files];
    const reader = new FileReader();
    reader.onloadend = (progressEvent) => {
      const result = progressEvent.target!.result;
      setEditAttach(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const onEditTitle = (event: any) => {
    const {
      target: { value },
    } = event;
    setEditTitle(value);
  };

  const onEditText = (event: any) => {
    const {
      target: { value },
    } = event;
    setEditText(value);
  };

  const onClearEditAttach = () => setEditAttach(undefined);

  return (
    <div className="postings">
      {edit ? (
        <>
          <form className="postings__form-editing" onSubmit={onEditSubmit}>
            <div className="postings__imageContainer-editing">
              {editAttach === undefined ? (
                <>
                  {" "}
                  <label htmlFor="img-edit" className="postings__label-editing">
                    Edit Image
                  </label>{" "}
                  <input
                    type="file"
                    className="postings__image-editing"
                    id="img-edit"
                    required
                    accept="image/*"
                    onChange={onEditFile}
                  />{" "}
                </>
              ) : (
                <img
                  alt=""
                  src={editAttach}
                  className="postings__edit-imagepreview"
                  onClick={onClearEditAttach}
                />
              )}
            </div>
            <div className="postings__content-editing">
              <input
                type="text"
                className="postings__title-editing"
                required
                placeholder={postingObj.title}
                onChange={onEditTitle}
              />
              <textarea
                className="postings__text-editing"
                required
                onChange={onEditText}
                placeholder={postingObj.text}
                rows={5}
              />
              <div className="postings__buttons">
                <button className="postings__button-submit">EDIT</button>
                <FontAwesomeIcon
                  className="postings__button-delete"
                  icon={faTrash}
                  onClick={postDelete}
                />
                <FontAwesomeIcon
                  className="postings__button-edit"
                  icon={faEdit}
                  onClick={toggleEdit}
                />
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="postings__imageContainer">
            <img
              alt=""
              src={postingObj.attachmentUrl}
              className="postings__image"
            />
          </div>
          <div className="postings__content">
            <p className="postings__title">{postingObj.title}</p>
            <p className="postings__text">{postingObj.text}</p>
            <div className="postings__dates">
              <p className="postings__dates-created">
                {postingObj.createdAt.toString()}
              </p>
              {postingObj.editedAt !== undefined ? (
                <p className="postings__dates-edited">
                  Edited At {postingObj.editedAt}
                </p>
              ) : null}
            </div>
            {isOwner ? (
              <div className="postings__buttons">
                <FontAwesomeIcon
                  className="postings__button-delete"
                  icon={faTrash}
                  onClick={postDelete}
                />
                <FontAwesomeIcon
                  className="postings__button-edit"
                  icon={faEdit}
                  onClick={toggleEdit}
                />
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Postings;
