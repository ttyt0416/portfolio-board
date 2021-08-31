import React, { useState, useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router";
import { authService } from "./firebase/firebase";

import Homepage from "./pages/homepage/homepage.component";
import Postpage from "./pages/postpage/postpage.component";

import Header from "./components/header/header.component";

const App: React.FC = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<null | {
    displayName: string | null;
    uid: string | null;
  }>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user!.displayName,
      uid: user!.uid,
    });
  };

  return (
    <>
      <Header userObj={userObj} />
      <Switch>
        <Route exact path="/">
          <Homepage userObj={userObj} />
        </Route>
        <Route exact path="/post">
          <Postpage userObj={userObj} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
