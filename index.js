
import { Header, Main, Footer } from "./components";
import * as state from "./store";

import env from "env"
import Navigo from "navigo";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";

import randomImage from "./lib/randomImage";
import getAPIData from "./lib/getAPIData";  // Used for API call
import writeResults from "./lib/writeResults";

const router = new Navigo(window.location.origin);
router.on({
  "/": () => render(state.Home),
  ":page": params => {
    let page = capitalize(params.page);

    // For Testing Only
    console.log(page);
    console.log(state[page]);

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

  randomImage();
  addHamburgerEventListener()
  addSearchBarBtnListener(st);
};

// Constant for Forms submit and to clear form data
const form = document.querySelector("form");
// Constant for Firebase Firestorm DB
const coll = db.collection("FMAdata");
// Hamburger listeners
function addHamburgerEventListener() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden");
  });
};


// Click listener for FMAresults Page
//-------------------------------------
function addSearchBarBtnListener(st) {
  if (st.page === "Fmaresults") {
    document.querySelector("#searchBar").addEventListener("submit", event => {
      event.preventDefault();
      searchBarSearch();
    });
  };
};


//**  Get the FMA Data from the JSON file 
//*****************************************
(function importDBJSON() {
  state.Fmaresults.fmaDBdata = [];
  fetch('https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/FMAData.json')
  .then(response => response.json())
  .then(response => {
    state.Fmaresults.fmaDBdata = response;
  })
  .catch(err => {
      console.log('The DBdata load request failed! Error with the DBdata import LINE 150. please try your search again.');
      console.log('error', err);
    });
}) ();


//**  Get TEST ZIP Data from the JSON file 
//*******************************************
(function importZIPJSON() {
  state.Fmaresults.tempZipData = [];
  fetch('https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/ZIPdata.json')
  .then(response => response.json())
  .then(response => {
    state.Fmaresults.tempZipData = response;
    })
  .catch(err => {
      console.log('The ZIPdata load request failed! Error with the ZIPdata import LINE 180. please try your search again.');
      console.log('error', err);
    });
}) ();


//**  Get the FMA Data from Firestore 
//*************************************
function firestormdata() {
  state.Fmaresults.fmaFirestormData = [];
  coll.get()
    .then(snapshot => snapshot.docs.forEach(doc => {
      state.Fmaresults.fmaFirestormData.push(doc.data());
    }))
    .catch(err => {
      console.log('The Firestorm load request failed! Error with the Firestorm import LINE 130. please try your search again.');
      console.log('error', err);
    });  
};


// Search from FMAresults Page
//-------------------------------
function searchBarSearch() {
  // zip code
  let userZipCode = document.getElementById("zipSearch").value;
  if (userZipCode == "") {
    alert("A Zip Code Is required");  // zip code validation
    return
  } else {
    state.Fmaresults.zipCode = userZipCode;
  };

  // radius
  let userRadius = document.querySelector("#radiusSearch").value;
  if (userRadius == "Radius") {
    alert("A radius is required");  // radius code validation
    return
  } else {
    state.Fmaresults.radius = userRadius;
    state.Fmaresults.filter = true;
  };

  // state
  let userState = document.querySelector("#stateSearch");
  if (userState.value != "Sate") {
    state.Fmaresults.filter = true;
    state.Fmaresults.stateCode = userState.value;
  };

  // type
  let userType = document.querySelector("#typeSearch");
  if (userType.value != "Type") {
    state.Fmaresults.type = userType.value;
    state.Fmaresults.filter = true;
  };

  // style
  let userStyle = document.querySelector("#styleSearch");
  if (userStyle.value != "Style") {
    state.Fmaresults.style = userStyle.value;
    state.Fmaresults.filter = true;
  };

  state.Fmaresults.returnedAPIdata = [];
  //*** Uncomment for Demmo day !!!
  //*********************************
  // const APIdata = getAPIData();
  // console.log(APIdata);  // for testing
  // state.Fmaresults.returnedAPIdata = APIdata;
  // compareTheData(state.Fmaresults.fmaDBdata, state.Fmaresults.returnedAPIdata);

  compareTheData(state.Fmaresults.fmaDBdata, state.Fmaresults.tempZipData);
};


// functions to COMPARE Data
//****************************
function compareTheData(DBdata, zipData) {
  state.Fmaresults.comparedData = [];
  zipData.forEach((zipItem) => {
    // Ugh! Hate that one can't have nested forEach fxns!
    for(let i = 0; i <= DBdata.length; i++) {
      if (zipItem.Code === DBdata[i].ZipCode) {
        console.log("DBdata[i]ZipCode ", DBdata[1].ZipCode);

        let tempItem = DBdata[i];
        // Pull the distance from target into data collection
        tempItem.Distance = zipItem.Distance;
        if (!tempItem.Distance || tempItem.Distance == "0") {
          tempItem.Distance = "Only a mile or so";
        };
        state.Fmaresults.comparedData.push(tempItem);
      };
    };
  });

  // console.log(state.Fmaresults.comparedData, filter);  // For testing 

  if (state.Fmaresults.filter) {
    // alert("Going to filterData"); // for testing
    filterData(state.Fmaresults.comparedData);
  } else {
    // alert("Going to Write the Data"); // for testing
    writeResults(state.Fmaresults.comparedData)
  };

};


//** FILTER according to search criteria (mostly works)
//*******************************************************
// zipCode and radius already taken care of at this point
// stateCode -- takes 2 alpha character code
// stateText -- full state name
// style -- Arnis, Escrima, Kali, or All
// type -- club, group, school, event, or All

function filterData(zipAndRadiusData) {
  let filteredData = [];

  // Check Radius
  //---------------
  let radiusData = [];
  if (state.Fmaresults.radius) {
    zipAndRadiusData.forEach((dataItem1) => {
      if (dataItem1.Distance == "Only a mile or so") {
        radiusData.push(dataItem1);
      } else if (dataItem1.Distance <= state.Fmaresults.radius) {
        radiusData.push(dataItem1);
      };
    });
    // for testing 
    // alert("There was a radius filter");

    if (radiusData.length >= 1) {
      filteredData = radiusData;
    };
  };

  // check STATE filter
  //---------------------
  let stateData = [];
  if (state.Fmaresults.stateCode != "state" || state.Fmaresults.stateCode != "") {
    if (filteredData.length >= 1) {
  	// if previous filter results
      filteredData.forEach((dataItem2) => {
        if (dataItem2.State == state.Fmaresults.stateCode || dataItem2.State === state.Fmaresults.stateText) {
          stateData.push(dataItem2);
        };
      });
    } else {
    	// if no previous filter results
      zipAndRadiusData.forEach((dataItem2) => {
        if (dataItem2.State == state.Fmaresults.stateCode || dataItem2.State === state.Fmaresults.stateText) {
          stateData.push(dataItem2);
        };
      });
    };
    // for testing 
      console.log("state data = ", state.Fmaresults.stateCode, state.Fmaresults.stateText, stateData);
      alert("There was a state filter");

    if (stateData.length >= 1) {
      filteredData = stateData;
    };
    console.log("filteredData = ", filteredData);
  };

  // check STYLE filter
  //---------------------
  let styleData = [];
  if (state.Fmaresults.style != "" || state.Fmaresults.style !== "All") {
  	// if previous filter results
    if (filteredData.length >= 1) {
      filteredData.forEach((dataItem3) => {
        if (dataItem3.Style == state.Fmaresults.style) {
          styleData.push(dataItem3);
        };
      });
    } else {
    	// if no previous results
      zipAndRadiusData.forEach((dataItem3) => {
        if (dataItem3.Style == state.Fmaresults.style) {
          styleData.push(dataItem3);
        };
      });
    };
    // for testing 
     console.log("style data = ", state.Fmaresults.style, styleData);
     alert("There was a style filter");

    if (styleData.length >= 1) {
      filteredData = styleData;
    };     
    console.log("filteredData = ", filteredData);
  };
  
  // check TYPE filter
  //---------------------
  let typeData = [];
  if (state.Fmaresults.type != "" || state.Fmaresults.type !== "All") {
  	// if previous filter results
    if (filteredData.length >= 1) {
      filteredData.forEach((dataItem4) => {
        if (dataItem4.Type == state.Fmaresults.type) {
          typeData.push(dataItem4);
        };
      });
    } else {
  		// If no previous filter results    	  	
        zipAndRadiusData.forEach((dataItem4) => {
        if (dataItem4.Type == state.Fmaresults.type) {
          typeData.push(dataItem4);
        };
      });
    };
    // for testing 
     console.log("type data = ", state.Fmaresults.type, typeData);
     alert("There was a type filter");

    if (typeData.length >= 1) {
      filteredData = typeData;
    };     
    console.log("filteredData = ", filteredData);
  };

  state.Fmaresults.filteredData = filteredData;
  console.log("final filtered data = ", state.Fmaresults.filteredData); // for testing

  // alert("Going to Write the Data"); // for testing
  writeResults(state.Fmaresults.filteredData)
};


// Still need to finish - User Form listeners ???
//-------------------------------------------------
// st.formDateCollection = [];
// form.addEventListener("submit", event => {
//   event.preventDefault();
//   Array.from(event.target.elements).forEach(el => {
//     console.log("Input Type: ", el.type);
//     console.log("Name: ", el.name);
//     console.log("Value: ", el.value);
//   });
// });
