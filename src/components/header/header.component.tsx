import React, { useState, useEffect } from "react";
import "./header.styles.scss";

import { Link, useHistory } from "react-router-dom";
import { authService } from "../../firebase/firebase";

import Authmodal from "../authmodal/authmodal.component";

interface UserInfo {
  userObj: any;
}

const Header: React.FC<UserInfo> = (userObj) => {
  const [modal, setModal] = useState<boolean>(false);
  let history = useHistory();

  const toggleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  const signOut = () => {
    authService.signOut();
  };

  useEffect(() => {
    setModal(false);
  }, [userObj]);

  const toHome = () => {
    history.push("/");
  };
  const toPost = () => {
    history.push("/post");
  };

  return (
    <>
      <div className="header">
        <ul className="header__links">
          <li className="header__link" onClick={toHome}>
            <Link className="header__link-link" to="/">
              Home
            </Link>
          </li>
          {userObj.userObj !== null ? (
            <>
              <li className="header__link" onClick={toPost}>
                <Link className="header__link-link" to="/post">
                  Post
                </Link>
              </li>
              <li className="header__link" onClick={signOut}>
                <div className="header__link-link">Log Out</div>
              </li>
            </>
          ) : (
            <li className="header__link" onClick={toggleModal}>
              <div className="header__link-link">Sign In</div>
            </li>
          )}
        </ul>
      </div>
      {modal === true ? (
        <>
          <div className="header__modalcloser" onClick={closeModal}></div>
          <Authmodal />
        </>
      ) : null}
    </>
  );
};

export default Header;
