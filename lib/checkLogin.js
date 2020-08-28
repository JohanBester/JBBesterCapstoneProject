// Below function Executes on click of login button
export default function validateLogin() {
  let attempts = 4;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // write mechanism to retrieve and match users
  if (username === usernameFromDB && password === passwordFromDB) {
    window.location = "membersArea.html"; // Redirecting to other page.
    return false;
  } else {
    attempts--; // Decrementing by one.
    alert(
      "Username or password is incorrect. You have " +
        attempts +
        " attempts left, ,please try again."
    );
    // Disabling fields after 4 attempts.
    if (attempts == 0) {
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("login").disabled = true;
      accountLock();
      alert(
        "Unfortunately this account has been locked. There were too many attempts to login. Please contact support for further  assistance."
      );
      window.location = "Contact.html"; // return user to home page
      return false;
    }
  }
}
