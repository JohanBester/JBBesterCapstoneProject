import accountLock from "./accountLock";
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

function listenForLogin(st) {
  if (st.view === "Login") {
    document.querySelector("#login-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove the login button so it's not included
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let email = inputs[0];
      let password = inputs[1];
      auth.signInWithEmailAndPassword(email, password).then(() => {
        console.log("user logged in");
        getUserFromDb(email)
          .then(() => render(state.Profile), router.navigate("/Profile"))
          .then(() => {
            populateProfile();
          });
      });
    });
  }
}

function populateProfile() {
  document.querySelector("#user-photo").src = `${state.User.profilePicture}`;
  document.querySelector("#user-name").innerText = `${state.User.name}`;
  document.querySelector("#user-location").innerText = `${state.User.location}`;
  document.querySelector("#user-hobbies").innerText = `${state.User.hobbies}`;
  document.querySelector("#instagram").href = `${state.User.instagram}`;
  document.querySelector("#youtube").href = `${state.User.youtube}`;
  document.querySelector("#pintrest").href = `${state.User.pintrest}`;
  document.querySelector("#facebook").href = `${state.User.instagram}`;
  document.querySelector("#blog-website").href = `${state.User.otherSite}`;
  document.querySelector("#user-wants").innerText = `${state.User.hobbies}`;
}
//------------------------------------//
function getUserFromDb(email) {
  return db
    .collection("users")
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        if (email === doc.data().email) {
          let id = doc.id;
          db.collection("users")
            .doc(id)
            .update({ signedIn: true });
          console.log("user signed in db");
          let user = doc.data();
          state.User.name = user.name;
          state.User.location = user.location;
          state.User.profilePicture = user.profilePicture;
          state.User.hobbies = user.hobbies;
          state.User.instagram = user.instagram;
          state.User.youtube = user.youtube;
          state.User.pintrest = user.pintrest;
          state.User.facebook = user.facebook;
          state.User.otherSite = user.otherSite;
          state.User.userWants = user.userWants;
          state.User.loggedIn = true;
          // populateProfile(state.User.profilePicture)
          console.log(state.User);
        }
      })
    );
}
