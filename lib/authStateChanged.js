import * as state from "../store";
import { auth } from "../firebase";

function authStateChanged() {
  auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let username = user.displayName;
      var useremail = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
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
