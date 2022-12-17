import "./styles.scss";

import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import logoPath from "@/assets/logo.svg";
import { getUserState, signIn } from "@/store/features/userSlice.js";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const TogglePasswordTypeIcon =
    passwordType === "password" ? AiOutlineEye : AiOutlineEyeInvisible;
  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  let [user, isUserLoading] = useSelector(getUserState);
  let navigate = useNavigate();

  useEffect(() => {
    if (isUserLoading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/favorites");
    }
  }, [user]);

  let dispatch = useDispatch()
  let handleForm = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  return (
    <div className="signin">
      <Link to={"/"} className="signin__link">
        <img className="signin__image" src={logoPath} alt="Logo" />
      </Link>
      <form className="signin__container" onSubmit={(e) => handleForm(e)}>
        <h1 className="signin__heading">Sign In</h1>
        <div className="signin__input-group">
          <label htmlFor="email" className="signin__label">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="signin__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </div>
        <div className="signin__input-group">
          <label htmlFor="password" className="signin__label">
            Password
          </label>
          <input
            id="password"
            type={passwordType}
            className="signin__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button className="signin__button">Sign In</button>
        <div className="signin__signup">
          {"Don't"} have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
      <p className="signin__rights">© All Rights Reserved</p>
    </div>
  );
};
