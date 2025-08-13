import { useState, useRef } from "react";
import classes from "./AuthForm.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../store/toast-context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const enterdEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional add validation
    setIsLoading(true);
    let url = "";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDl6Cd3Y9uuqajZk1rr7W_vEKXcoUSGpmQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDl6Cd3Y9uuqajZk1rr7W_vEKXcoUSGpmQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enterdEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        return res.json().then((data) => {
          if (!res.ok) {
            throw new Error(data.error.message);
          }
          return data;
        });
      })
      .then((data) => {
        !isLogin && addToast("SignUp Successfull !!", "success");
        isLogin && authCtx.login(data.idToken);
        isLogin && addToast("Login Successfull !!", "success");
        navigate("/");
      })
      .catch((error) => {
        // alert(error.message || "Authentication Failed !!");
        addToast(error.message, "error");
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending Request.....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
