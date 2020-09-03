import * as state from "../store";
import accountLock from "./accountLock";

export default function checkLogin() {
  let attempts = state.Profile.attempts;
  // let username = document.getElementById("username").value;
  // let password = document.getElementById("password").value;

  // write mechanism to retrieve and match users
  // if (username === usernameFromDB && password === passwordFromDB) {
  //   window.location = "membersArea.html";
  //   return false;
  // } else {

  if (attempts !== 0) {
    attempts--; // Decrementing by one.
    alert(
      "Username or password is incorrect. You have " +
        attempts +
        " attempts left, ,please try again."
    );
    state.Profile.attempts = attempts;
  } else if (attempts == 0) {
    // Disabling login fields after too many login attempts.
    document.querySelector("#login-form").disabled = true;
    // document.getElementById("username").disabled = true;
    // document.getElementById("useremail").disabled = true;
    // document.getElementById("password").disabled = true;
    // document.getElementById("clear").disabled = true;
    // document.getElementById("login").disabled = true;
    // document.getElementById("resetButton").disabled = true;

    window.location = "/";

    alert(
      "Unfortunately this account has been locked. There were too many attempts to login. Please contact support for further  assistance."
    );
    // accountLock();
  }
  // }
}
