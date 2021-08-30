import React, { useState, useEffect } from "react";
import "./header.styles.scss";

import { Link } from "react-router-dom";
import { authService } from "../../firebase/firebase";

import Authmodal from "../authmodal/authmodal.component";

interface UserInfo {
  userObj: any;
}

const Header: React.FC<UserInfo> = (userObj) => {
  const [modal, setModal] = useState<boolean>(false);

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

  return (
    <>
      <div className="header">
        <ul className="header__links">
          <li className="header__link">
            <Link className="header__link-link" to="/">
              Home
            </Link>
          </li>
          {userObj.userObj !== null ? (
            <>
              <li className="header__link">
                <Link className="header__link-link" to="/post">
                  Post
                </Link>
              </li>
              <li className="header__link">
                <div className="header__link-link" onClick={signOut}>
                  Log Out
                </div>
              </li>
            </>
          ) : (
            <div className="header__link-link" onClick={toggleModal}>
              Sign In
            </div>
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
