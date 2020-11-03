import { Header, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";

import randomImage from "./lib/randomImage";
import formSubmit from "./lib/formSubmit";
import getAPIData from "./lib/getAPIData";
import checklogin from "./lib/checkLogin";
// import accountLock from "./lib/accountLock";

const router = new Navigo(window.location.origin);
router
  .on({
    "/": () => render(state.Home),
    ":page": (params) => {
      let page = capitalize(params.page);
      render(state[page]);
    },
  })
  .resolve();

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header()}
    ${Main(st)}
    ${Footer()}
  `;

  router.updatePageLinks();

  // only load Profile page if user is Signed in
  if (st.page === "Profile") {
    logoutListener(st);
    if (!state.Profile.signedIn) {
      render(state.Home);
      router.navigate("/Home");
    }
  }

  randomImage();
  addHamburgerEventListener();
  formSendButtonListener(st);
  addSearchBarBtnListener(st);

  listenForRegister(st);
  listenForLoginForm(st);

  profileTestBtnListener(st);
}

// Constant for Forms submit and to clear form data
const form = document.querySelector("form");

// Profile test Button Listener
function profileTestBtnListener(st) {
  if (st.page === "Login") {
    document
      .querySelector("#profileTestBtn > button")
      .addEventListener("click", () => {
        event.preventDefault();
        render(state.Profile);
        router.navigate("/Profile");
      });
  }
}

// Hamburger listeners
function addHamburgerEventListener() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden");
  });
}

// Forms Send Button intervention
function formSendButtonListener(st) {
  if (st.page === "Contact" || st.page === "Addinfo") {
    // handle the form submission event
    document.querySelector("#send").addEventListener("click", (event) => {
      event.preventDefault();
      formSubmit(st);
    });
  }
}

// Click listener for FMAresults Page
function addSearchBarBtnListener(st) {
  if (st.page === "Fmaresults") {
    document.querySelector("#searchBar").addEventListener("submit", (event) => {
      event.preventDefault();
      searchBarSearch();
    });
  }
}

//***  Get the FMA Data from the JSON file ***
(function importDBJSON() {
  state.Fmaresults.fmaDBdata = [];
  fetch(
    "https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/FMAData.json"
  )
    .then((response) => response.json())
    .then((response) => {
      state.Fmaresults.fmaDBdata = response;
    })
    .catch((err) => {
      console.log("error", err);
    });
})();

//*** Search from FMAresults Page ***
function searchBarSearch() {
  state.Fmaresults.filter = false;
  // zip code
  let userZipCode = document.getElementById("zipSearch").value;
  if (userZipCode == "") {
    alert("A Zip Code Is required"); // zip code validation
    return;
  } else {
    state.Fmaresults.zipCode = userZipCode;
  }
  // radius
  let userRadius = document.querySelector("#radiusSearch").value;
  if (userRadius == "Radius") {
    alert("A radius is required"); // radius code validation
    return;
  } else {
    state.Fmaresults.radius = userRadius;
  }
  // state
  // let userState = document.querySelector("#stateSearch");
  // if (userState.value != "Sate") {
  //   state.Fmaresults.filter = true;
  //   state.Fmaresults.stateCode = userState.value;
  // };
  // type
  let userType = document.querySelector("#typeSearch");
  if (userType.value !== "Type" && userType.value !== "All") {
    state.Fmaresults.filter = true;
    state.Fmaresults.type = userType.value;
  }
  // style
  let userStyle = document.querySelector("#styleSearch");
  if (userStyle.value !== "Style" && userStyle.value !== "All") {
    state.Fmaresults.filter = true;
    state.Fmaresults.style = userStyle.value;
  }

  // alert("Getting API data now.");  // for testing
  state.Fmaresults.returnedAPIdata = [];
  getAPIData();
  // compareTheData(state.Fmaresults.fmaDBdata, state.Fmaresults.tempZipData); // for testing
}

/***************************************************** */
/*
  Login and Profile Process is as follows ...
  -------------------------------------------
    Register New User
      - Create user in AUTH 
      - Add user to DB
      - send registration confirmation Email
      - check confirmation link
    
    User Login
      - Check Auth
      - Get user from DB
        - set user as signedIn : True
      - load Profile page

    User Logout
      - Signout in AUTH
      - Signout in DB
        - set user as signedIn : False
      - Reset user in State
      - load Home page

    AUTH state listener
      - Auth state change listener

*/

//*** Register form submit listener **
function listenForRegister(st) {
  if (st.page === "Register") {
    document
      .querySelector("#signup-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        //convert html elements to Array
        let inputList = Array.from(event.target.elements);
        //remove submit and clear buttons from array
        inputList.pop();
        inputList.pop();
        const inputs = inputList.map((input) => input.value);
        let firstname = inputs[0];
        let lastname = inputs[1];
        let username = inputs[2];
        let useremail = inputs[3];
        let password1 = inputs[4];
        let password2 = inputs[5];

        if (password1 === password2) {
          let password = password2;

          //create user in database
          auth
            .createUserWithEmailAndPassword(useremail, password)
            .then(() => {
              addUserToDB(firstname, lastname, username, useremail);
            })
            .then(() => {
              registrationConfirmation();
            })
            .catch((err) => {
              // What to do when the request fails
              alert(
                "There seems to be a problem with this Registration. Kindly please reload the page and try that again."
              );
              console.log("Error", err);
            });
        } else {
          alert("Passwords have to match. Please re-enter the passwords.");
        }
      });
  }
}

//*** Registration Confirmation process */
function registrationConfirmation() {
  // Send email asking user to confirm registration by clicking the link
  // Capture URL confirmation link and accept user
}

//*** Listen for User Login ***
function listenForLoginForm(st) {
  if (st.page === "Login") {
    document
      .querySelector("#login-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        //convert html elements to Array
        let inputList = Array.from(event.target.elements);
        //remove the button links so they aren't included
        inputList.pop();
        inputList.pop();

        const inputs = inputList.map((input) => input.value);
        let username = inputs[0];
        let email = inputs[1];
        let password = inputs[2];

        state.Profile.username = username;
        state.Profile.useremail = email;
        state.Profile.password = password;

        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            getUserFromDb(email).then(() => {
              populateProfilePage();
            });
          })
          .catch((err) => {
            // What to do when the request fails
            alert(err);
            console.log("Error", err);
            checklogin();
          });
      });
  }
}

//*** Listen for User Logout ***
function logoutListener(st) {
  if (st.page === "Profile") {
    document
      .querySelector("#logoutButton")
      .addEventListener("click", (event) => {
        event.preventDefault();
        //Test if user is logged-in
        if (st.loggedIn) {
          auth.signOut().then(() => {
            logOutUserInDb(st.useremail).then(() => {
              render(state.Home);
              router.navigate("/Home");
            });
          });
        } else {
          render(state.Home);
          router.navigate("/Home");
        }
      });
  }
}

//*** Populate the profile page with user info ***
function populateProfilePage() {
  document.querySelector("#logInOutLink").textContent = "Logout";
  render(state.Profile), router.navigate("/Profile");
}

//*** Add user to the Database ***
function addUserToDB(firstname, lastname, username, email, password) {
  db.collection("users").add({
    firstname: firstname,
    lastname: lastname,
    username: username,
    useremail: email,
    password: password,
    signedIn: false,
  });
}

//*** Get user form the Database ***
function getUserFromDb(email) {
  return db
    .collection("users")
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach((doc) => {
        if (email === doc.data().useremail) {
          let user = doc.data();
          let id = doc.id;
          db.collection("users")
            .doc(id)
            .update({ signedIn: true });

          setUserInState(user);
        }
      })
    )
    .catch((err) => {
      // What to do when the request fails
      alert(err);
      console.log("Error", err);
    });
}

//*** log-out the user in the DB ***
function logOutUserInDb(email) {
  return db
    .collection("users")
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach((doc) => {
        if (email === doc.data().useremail) {
          let id = doc.id;
          db.collection("users")
            .doc(id)
            .update({ signedIn: false });

          resetUserInState();
        }
      })
    )
    .catch((err) => {
      // What to do when the request fails
      alert(err);
      console.log("Error", err);
    });
}

//*** SET the user in state ***
function setUserInState(user) {
  state.Profile.firstname = user.firstname;
  state.Profile.lastname = user.lastname;
  state.Profile.username = user.username;
  state.Profile.useremail = user.useremail;
  state.Profile.signedIn = true;
}

//*** Reset user in state ***
function resetUserInState() {
  state.Profile.firstname = "";
  state.Profile.lastname = "";
  state.Profile.username = "";
  state.Profile.useremail = "";
  state.Profile.password = "";
  state.Profile.signedIn = false;
}
