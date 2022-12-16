import "../sign-in/styles.scss";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import logoPath from "@/assets/logo.svg";
import { auth, signUpWithEmailAndPassword } from "@/services/firebase.js";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const TogglePasswordTypeIcon =
    passwordType === "password" ? AiOutlineEye : AiOutlineEyeInvisible;
  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading]);

  return (
    <div className="signin">
      <Link to={"/"} className="signin__link">
        <img className="signin__image" src={logoPath} alt="Logo" />
      </Link>
      <div className="signin__container">
        <h1 className="signin__heading">Sign Up</h1>
        <div className="signin__input-group">
          <label htmlFor="name" className="signin__label">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="signin__input"
            placeholder="Your name"
          />
        </div>
        <div className="signin__input-group">
          <label htmlFor="email" className="signin__label">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="signin__input"
            placeholder="Your email"
          />
        </div>
        <div className="signin__input-group">
          <label htmlFor="password" className="signin__label">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordType}
            className="signin__input"
            placeholder="Your password"
          />
          <button
            type="button"
            className="signin__show-password-button"
            onClick={togglePasswordType}
          >
            <TogglePasswordTypeIcon className="signin__show-password-icon" />
          </button>
        </div>
        <div className="signin__input-group">
          <label htmlFor="confirmPassword" className="signin__label">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signin__input"
            placeholder="Confirm password"
          />
          {confirmPassword && confirmPassword !== password && (
            <div className="signin__error">Passwords {"doesn't"} match</div>
          )}
        </div>
        <button
          className="signin__button"
          onClick={() => signUpWithEmailAndPassword(name, email, password)}
        >
          Sign In
        </button>
        <div className="signin__signup">
          {"Don't"} have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
      <p className="signin__rights">© All Rights Reserved</p>
    </div>
  );
};
