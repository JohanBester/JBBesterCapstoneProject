import * as state from "../store";
import { auth } from "../firebase";

function authStateChanged() {
  auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let username = user.displayName;
      let useremail = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed in";
      document.getElementById("quickstart-sign-in").textContent = "Sign out";
      document.getElementById(
        "quickstart-account-details"
      ).textContent = JSON.stringify(user, null, "  ");
      if (!emailVerified) {
        document.getElementById("quickstart-verify-email").disabled = false;
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed out";
      document.getElementById("quickstart-sign-in").textContent = "Sign in";
      document.getElementById("quickstart-account-details").textContent =
        "null";
      // [END_EXCLUDE]
    }
  });
}
