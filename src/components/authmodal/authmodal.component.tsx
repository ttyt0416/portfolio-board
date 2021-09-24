import React, { useState } from "react";
import "./authmodal.styles.scss";

import { authService, firebaseInstance } from "../../firebase/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Authmodal: React.FC = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);

  // get value of email or password when change
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "signinEmail") {
      setEmail(value);
    } else if (name === "signinPassword") {
      setPassword(value);
    }
  };

  // function for when click Submit button
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let data;
      const {
        target: { name },
      } = event;
      if (name === "signin") {
        // when it is signin mode
        data = await authService.signInWithEmailAndPassword(Email, Password);
      } else if (name === "signup") {
        // when it is signup mode
        data = await authService.createUserWithEmailAndPassword(
          Email,
          Password
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // toggle signin and signup mode
  const toggleAuth = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAuth(!auth);
  };

  // when click 'signin with google'
  const onSocialClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <div className="authmodal"></div>
      <div className="authmodal__container">
        <div className="authmodal__auth">
          <h1 className="authmodal__auth-title">
            {auth ? "Sign In" : "Sign Up"}
          </h1>
          <form
            className="authmodal__auth-form"
            name={auth ? "signin" : "signup"}
            onSubmit={onSubmit}
          >
            <input
              required
              className="authmodal__auth-email"
              type="email"
              placeholder="Email"
              name="signinEmail"
              value={Email}
              onChange={onChange}
            />
            <input
              required
              className="authmodal__auth-password"
              type="password"
              placeholder="Password"
              name="signinPassword"
              value={Password}
              onChange={onChange}
            />
            <input
              className="authmodal__auth-submit"
              type="submit"
              value="Sign In"
            />
            <span className="authmodal__auth-span">
              {auth ? "Didn't signed up yet? " : "Already signed up? "}
              <button className="authmodal__auth-toggle" onClick={toggleAuth}>
                {auth ? "Sign Up" : "Sign In"}
              </button>
            </span>
            <button className="authmodal__auth-social" onClick={onSocialClick}>
              <FontAwesomeIcon
                icon={faGoogle}
                className="authmodal__auth-google"
              />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Authmodal;
