import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../store/toast-context";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { addToast } = useToast();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDl6Cd3Y9uuqajZk1rr7W_vEKXcoUSGpmQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // asume to be always success
      console.log("Password-changed", res);
      addToast("password changed successfully !!", "info");
      navigate("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
