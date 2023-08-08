// AuthComponent.js
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import axios from "axios";

initializeApp(firebaseConfig);

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [json, setJson] = useState();

  const auth = getAuth(); // Get the authentication instance

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // You can access user information from the `result.user` object
      console.log("Google sign-in result:", result.user);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };
  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // You can access user information from the `result.user` object
      console.log("Google sign-in result:", result.user);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };
  
  const instance = axios.create({baseURL:"https://first-project-776af-default-rtdb.firebaseio.com"})

  const handleDataPush = async () => {
    const dataToSend = {
      json,
    };
    try {
      const result = await instance.post(
        "/new",
        dataToSend
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isSignUp ? "Sign Up" : "Log In"}</button>
      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </p>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <button onClick={handleGithubSignIn}>Sign In with Github</button>
      <br></br>
      <hr></hr>
      <input onChange={(e) => setJson(e.target.value)}></input>
      <button onClick={handleDataPush}>push data</button>
    </div>
  );
};

export default AuthComponent;
