import { Header, Main, Footer } from "./components";
import * as state from "./store";

import Navigo from "navigo";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";
import axios from "axios";

import randomImage from "./lib/randomImage";
// import getAPIData from "./lib/getAPIData"; // Used for API call
import writeResults from "./lib/writeResults";
import formSubmit from "./lib/formSubmit";

const router = new Navigo(window.location.origin);
router
  .on({
    "/": () => render(state.Home),
    ":page": params => {
      let page = capitalize(params.page);
      render(state[page]);
    }
  })
  .resolve();

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header()}
    ${Main(st)}
    ${Footer()}
  `;

  router.updatePageLinks();

  randomImage();
  addHamburgerEventListener();
  formSendButtonListener(st);
  addSearchBarBtnListener(st);

  loginLogoutListener(state.Profile);
  listenForRegister(st);
  listenForLogin(st);

  profileTestBtnListener(st);
}

// Constant for Forms submit and to clear form data
const form = document.querySelector("form");

// Hamburger listeners
function addHamburgerEventListener() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden");
  });
}

// Profile test Button Listener
function profileTestBtnListener(st) {
  if (st.page === "Login") {
    document.querySelector("#profileTestBtn").addEventListener("click", () => {
      event.preventDefault();
      render(state.Profile);
      router.navigate("/Profile");
    });
  }
}

// Forms Send Button intervention
function formSendButtonListener(st) {
  if (st.page === "Contact" || st.page === "Addinfo") {
    // handle the form submission event
    document.querySelector("#send").addEventListener("click", event => {
      event.preventDefault();
      formSubmit(st);
    });
  }
}

// Click listener for FMAresults Page
function addSearchBarBtnListener(st) {
  if (st.page === "Fmaresults") {
    document.querySelector("#searchBar").addEventListener("submit", event => {
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
    .then(response => response.json())
    .then(response => {
      state.Fmaresults.fmaDBdata = response;
    })
    .catch(err => {
      console.log(
        "The DBdata load request failed! Error with the DBdata import LINE 150. please try your search again."
      );
      console.log("error", err);
    });
})();

//*** Search from FMAresults Page ***
function searchBarSearch() {
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
  if (userType.value != "Type") {
    state.Fmaresults.type = userType.value;
    state.Fmaresults.filter = true;
  }
  // style
  let userStyle = document.querySelector("#styleSearch");
  if (userStyle.value != "Style") {
    state.Fmaresults.style = userStyle.value;
    state.Fmaresults.filter = true;
  }
  // alert("Getting API data now.");  // for testing
  //*** Uncomment for Demo day !!!
  //*********************************
  getAPIData();
  // compareTheData(state.Fmaresults.fmaDBdata, state.Fmaresults.tempZipData); // for testing
}

//***  Get the FMA Data from API ***
function getAPIData() {
  state.Fmaresults.returnedAPIdata = [];
  let zipCode = state.Fmaresults.zipCode;
  let radius = state.Fmaresults.radius;
  let APIkey = process.env.ZIP_CODES_API_KEY;
  axios
    .get(
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=${APIkey}`
    )
    .then(response => {
      console.log(response.data);
      state.Fmaresults.returnedAPIdata = response.data;
      if (response.status === 200) {
        alert("Going to compare the Data"); // for testing
        compareTheData(
          state.Fmaresults.fmaDBdata,
          state.Fmaresults.returnedAPIdata
        );
        return true;
      } else {
        alert(
          "There seems to be a problem with this search. Kindly please try that again."
        );
      }
    })
    .catch(err => {
      // What to do when the request fails
      alert(
        "There seems to be a problem with this search. Kindly please try that again."
      );
      console.log("The Axios API request failed!");
      console.log("Error", err);
    });
}

//** functions to COMPARE Data
//*****************************
function compareTheData(DBdata, zipData) {
  console.log("DBdata = ", DBdata);
  console.log("zipData = ", zipData);

  state.Fmaresults.comparedData = [];
  zipData.DataList.forEach(zipItem => {
    DBdata.forEach(dbItem => {
      if (zipItem.Code === dbItem.ZipCode) {
        let tempItem = dbItem;
        tempItem.Distance = zipItem.Distance; // Pull distance from target into data collection
        if (!tempItem.Distance || tempItem.Distance == "0") {
          tempItem.Distance = "Only a mile or so";
        }
        state.Fmaresults.comparedData.push(tempItem);
      }
    });
  });
  // console.log("compared data = ", state.Fmaresults.comparedData);
  if (state.Fmaresults.filter) {
    alert("Going to filter the data");
    filterData(state.Fmaresults.comparedData);
  } else {
    alert("Going to Print the data");
    writeResults(state.Fmaresults.comparedData);
  }
}

//** FILTER according to search criteria
//***************************************
function filterData(zipAndRadiusData) {
  let filteredData = [];

  // check TYPE filter
  let typeData = [];
  if (state.Fmaresults.type != "" && state.Fmaresults.type !== "All") {
    // if previous filter results
    if (filteredData.length >= 1) {
      filteredData.forEach(dataItem4 => {
        if (capitalize(dataItem4.Type) === capitalize(state.Fmaresults.type)) {
          typeData.push(dataItem4);
        }
      });
    } else {
      // If no previous filter results
      zipAndRadiusData.forEach(dataItem4 => {
        if (capitalize(dataItem4.Type) === capitalize(state.Fmaresults.type)) {
          typeData.push(dataItem4);
        }
      });
    }
    if (typeData.length >= 1) {
      filteredData = typeData;
    }
  }

  // check STYLE filter
  let styleData = [];
  if (state.Fmaresults.style !== "" && state.Fmaresults.style !== "All") {
    // if previous filter results
    if (filteredData.length >= 1) {
      filteredData.forEach(dataItem3 => {
        if (
          capitalize(dataItem3.Style) === capitalize(state.Fmaresults.style)
        ) {
          console.log("Style = ", state.Fmaresults.style);
          styleData.push(dataItem3);
        }
      });
    } else {
      // if no previous results
      zipAndRadiusData.forEach(dataItem3 => {
        if (
          capitalize(dataItem3.Style) === capitalize(state.Fmaresults.style)
        ) {
          styleData.push(dataItem3);
        }
      });
    }
    if (styleData.length >= 1) {
      filteredData = styleData;
    }
  }

  // check STATE filter (disabled for now)
  // let stateData = [];
  // if (state.Fmaresults.stateCode != "state" || state.Fmaresults.stateCode != "") {
  // 	// if previous filter results
  //   if (filteredData.length >= 1) {
  //     filteredData.forEach((dataItem2) => {
  //       if (dataItem2.State === state.Fmaresults.stateText || dataItem2.State == state.Fmaresults.stateCode) {
  //         stateData.push(dataItem2);
  //       };
  //     });
  //   } else {
  //   	// if no previous filter results
  //     zipAndRadiusData.forEach((dataItem2) => {
  //       if (dataItem2.State == state.Fmaresults.stateCode || dataItem2.State === state.Fmaresults.stateText) {
  //         stateData.push(dataItem2);
  //       };
  //     });
  //   };
  //   // for testing
  //     console.log("state data = ", state.Fmaresults.stateCode, state.Fmaresults.stateText, stateData);
  //     alert("There was a state filter");
  //   if (stateData.length >= 1) {
  //     filteredData = stateData;
  //   };
  //   console.log("filteredData = ", filteredData);
  // };

  // Check Radius (disabled for now)
  // let radiusData = [];
  // if (state.Fmaresults.radius) {
  //   zipAndRadiusData.forEach(dataItem1 => {
  //     if (dataItem1.Distance === "Only a mile or so") {
  //       radiusData.push(dataItem1);
  //     }
  //     if (dataItem1.Distance <= state.Fmaresults.radius) {
  //       radiusData.push(dataItem1);
  //     }
  //   });
  //   if (radiusData.length >= 1) {
  //     filteredData = radiusData;
  //   }
  // }

  state.Fmaresults.filteredData = filteredData;
  writeResults(state.Fmaresults.filteredData);
}

//*** Register form click listener **
function listenForRegister(st) {
  if (st.view === "Register") {
    document.querySelector("#signup-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove submit button so it's not included
      inputList.pop();
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let firstname = inputs[0];
      let lastname = inputs[0];
      let username = inputs[0];
      let useremail = inputs[1];
      let password1 = inputs[2];
      let password2 = inputs[3];

      if (password1 === password2) {
        let password = password2;
        //create user in database
        auth
          .createUserWithEmailAndPassword(useremail, password)
          .then(response => {
            if (response.status === 200) {
              console.log("user registered");
              //add user to state and database
              addUserToStateAndDB(
                firstname,
                lastname,
                username,
                useremail,
                password
              );
              console.log(state.User);
              render(state.Profile);
              router.navigate("/Profile");
              populateProfilePage();
            }
          })
          .catch(err => {
            // What to do when the request fails
            alert(
              "There seems to be a problem with this Registration. Kindly please reload the page and try that again."
            );
            console.log("The DB create user request failed!");
            console.log("Error", err);
          });
      } else {
        alert("Passwords have to match. Please re-enter the passwords.");
      }
    });
  }
}

//*** Add user to state and database ***
function addUserToStateAndDB(
  firstname,
  lastname,
  username,
  useremail,
  password
) {
  // add user to state
  state.Profile.firstname;
  state.Profile.lastname;
  state.Profile.username;
  state.Profile.useremail;
  state.Profile.password;
  state.Profile.signedIn = true;
  state.Profile.loggedIn = true;

  // add user to database
  db.collection("users").add({
    firstname: firstname,
    lastname: lastname,
    username: username,
    useremail: useremail,
    password: password,
    signedIn: true,
    loggedIn: true
  });
}

//*** Populate the profile page with user info ***
function populateProfilePage(st) {
  if (st.view === "Profile") {
    document.querySelector(
      "#user-name"
    ).innerText = `${state.Profile.firstname} ${state.Profile.lastname}`;
    document.querySelector(
      "#user-name"
    ).innerText = `${state.Profile.username}`;
    document.querySelector(
      "#user-email"
    ).innerText = `${state.Profile.useremail}`;
  }
}

//*** Listen for User Login ***
function listenForLogin(st) {
  if (st.view === "Login") {
    document.querySelector("#login-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove the login button so it's not included
      inputList.pop();
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let username = inputs[0];
      let email = inputs[1];
      let password = inputs[2];
      auth.signInWithEmailAndPassword(email, password).then(() => {
        console.log("user logged in");
        getUserFromDb(email)
          .then(() => render(state.Profile), router.navigate("/Profile"))
          .then(() => {
            populateProfilePage();
          });
      });
    });
  }
}

//*** Get user form the Database ***
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
          state.Profile.firstname = user.firstname;
          state.Profile.lastname = user.lastname;
          state.Profile.username = user.username;
          state.Profile.useremail = user.useremail;
          state.Profile.signedIn = true;
          state.Profile.loggedIn = true;

          console.log(state.User); // for testing
        }
      })
    );
}

function loginLogoutListener(st) {
  if (st.view === "Profile") {
    document.querySelector("#log-out").addEventListener("click", event => {
      //Test if user is logged-in
      if (st.loggedIn) {
        event.preventDefault();
        //log-out fxn//
        auth.signOut().then(() => {
          console.log("user logged out");
          logOutUserInDb(st.email);
          resetUserInState();
          //update user in db
          db.collection("users").get;
          render(state.Home);
          router.navigate("/Home");
        });
        console.log(state.User);
      }
    });
  }
}

//*** log-out the user in the Database ***
function logOutUserInDb(email) {
  if (state.Profile.loggedIn) {
    db.collection("users")
      .get()
      .then(snapshot =>
        snapshot.docs.forEach(doc => {
          if (email === doc.data().email) {
            let id = doc.id;
            db.collection("users")
              .doc(id)
              .update({ signedIn: false });
          }
        })
      );
    console.log("user signed out in db");
  }
}

//*** Reset user in state ***
function resetUserInState() {
  state.Profile.firstname = "";
  state.Profile.lastname = "";
  state.Profile.username = "";
  state.Profile.useremail = "";
  state.Profile.password = "";
  state.Profile.signedIn = false;
  state.Profile.loggedIn = false;
}
