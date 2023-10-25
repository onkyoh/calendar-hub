import { useState } from "react";
import { db, auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

import { EMPTY_CALENDAR } from "../consts/constants";
import { validate } from "../utils/loginValidation";

import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";
import useError from "../hooks/useError";

const Login = (props) => {
  const [newUser, setNewUser] = useState(false);
  const toggleNewUser = () => {
    setNewUser((prev) => !prev);
    handleError("");
    resetLogin();
    resetRegister();
  };

  const [loginInfo, handleLogin, resetLogin] = useLogin(newUser);
  const { error, handleError } = useError();
  const [registerInfo, handleRegister, resetRegister] = useRegister(newUser);

  const register = async (e) => {
    e.preventDefault();
    const hasError = validate({ ...registerInfo });
    if (hasError) {
      handleError(hasError);
      return;
    }
    try {
      const calendarId = uuidv4();

      const cred = await createUserWithEmailAndPassword(
        auth,
        registerInfo.email,
        registerInfo.password
      );
      await setDoc(doc(db, "calendars", calendarId), {
        schedule: JSON.stringify([...EMPTY_CALENDAR()]),
      });
      await setDoc(doc(db, "users", cred.user.uid), {
        contacts: [],
        incomingRequests: [],
        calendarId: calendarId,
        displayName: registerInfo.displayName,
      });
      props.handleCurrentUser(cred.user.uid);
    } catch (error) {
      handleError(error.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      props.handleCurrentUser(cred.user.uid);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div id="login_page">
      {newUser ? (
        <form onSubmit={(e) => register(e)}>
          <h2>register</h2>
          <p className="error pop-in" style={!error ? { display: "none" } : {}}>
            {error}
          </p>
          <label htmlFor="name_register">display name *</label>
          <input
            type="text"
            id="name_register"
            value={registerInfo.displayName}
            onChange={(e) => handleRegister("displayName", e)}
          />
          <label htmlFor="email_register">email *</label>
          <input
            type="email"
            id="email_register"
            value={registerInfo.email}
            onChange={(e) => handleRegister("email", e)}
          />
          <label htmlFor="password_register">password *</label>
          <input
            type="password"
            id="password_register"
            value={registerInfo.password}
            onChange={(e) => handleRegister("password", e)}
          />
          <button type="submit">submit</button>
          <p className="need-account">
            already have an account?
            <span onClick={toggleNewUser}> click here.</span>
          </p>
        </form>
      ) : (
        <form onSubmit={(e) => login(e)}>
          <h2>login</h2>
          <p className="error pop-in" style={!error ? { display: "none" } : {}}>
            {error}
          </p>
          <label htmlFor="email_login">email</label>
          <input
            type="email"
            id="email_login"
            value={loginInfo.email}
            onChange={(e) => handleLogin("email", e)}
          />
          <label htmlFor="password_login">password</label>
          <input
            type="password"
            id="password_login"
            value={loginInfo.password}
            onChange={(e) => handleLogin("password", e)}
          />
          <button type="submit">submit</button>
          <p className="need-account">
            need an account?<span onClick={toggleNewUser}> click here.</span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
