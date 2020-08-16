
import { Header, Main, Footer } from "./components";
import * as state from "./store"

import Navigo from "navigo";
import { capitalize } from "lodash";

import randomImage from "./lib/randomImage"
import getAPIData from "./lib/getAPIData"
// import DBJSON from "./lib/DBJSON"  // not working
// import ZIPJSON from "./lib/ZIPJSON"  // not working

const router = new Navigo(window.location.origin);
router.on({
  "/": () => render(state.Home),
  ":page": params => {
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

  randomImage();
  addBannerEventListener();
  addHamburgerEventListener()
  addInfoEventListener();
  addButtonsEventListener();
  addDisclaimerEventListener();
  addZipSearchBtnListener();
  addSearchFilterBtnListener(st);
  addSearchBarDropDownsListeners(st);
};

// add random image to page (works)
let randomURL = randomImage();
document.querySelector('.addOrImage').innerHTML = `
  <img id="imgFMAfighters" src="${randomURL}" alt="General Filipino martial Artists images about Arnis, Escrima, and Kali."/>
`;

// Constant for Forms submit and to clear form data (works)
const form = document.querySelector("form");

// Header listeners (works)
//==========================
// Nav toggle for bars icon in nav bar
function addHamburgerEventListener() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden");
  });
};
// banner clicks to go to home page
function addBannerEventListener() {
  let banner = document.querySelectorAll("header.a")
  banner.forEach(link =>
    link.addEventListener("click", event => {
      event.preventDefault();
      render(state.Home);
    })
  );
};

// click listener for AddInfo button (works)
//===========================================
function addInfoEventListener() {
  document.querySelector('#hpAddInfoButton').addEventListener("click", event => {
    event.preventDefault();
    render(state.AddInfo);
  });
};

// click listeners for Footer (Works)
//====================================
// disclaimer area
function addDisclaimerEventListener() {
  document.querySelector("#disclaimers > a").addEventListener("click", event => {
    event.preventDefault();
    render(state.Disclaimers);
  });
};
// nav buttons
function addButtonsEventListener() {
  let buttons = document.querySelectorAll(".fixed-footer a");
  buttons.forEach(link =>
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = capitalize(event.target.text);
      let pieceOfState = state[linkText];
      render(pieceOfState);
    })
  );
};

// click listener for HOMEPAGE (works)
//=====================================
function addZipSearchBtnListener() {
    document.querySelector("button").addEventListener("click", event => {
      event.preventDefault();
      zipCodeSearch();
    });
};

// click listener for FMAresules Page (Not WORKING)
//===================================================
function addSearchFilterBtnListener(st) {
  if (st == state.FMAresules) {
    document.querySelector("button").addEventListener("click", event => {
      event.preventDefault();
      searchBarSubmit();
    });
  };
};

function addSearchBarDropDownsListeners(st) {
  if (st == state.FMAresules) {
    // check user zip code input
    let zipField = document.querySelector("#zipSearch");
    zipField.onChange = function() {
      state.Params.zipCode = zipField.value;
    };

    // check user Drop-Down inputs
    // const form = document.querySelector("form");
    let sbFields = form.querySelectorAll("sbField");
    sbFields.forEach(field =>
      field.onChange = function() {
        let value = field.options[field.selectedIndex].value;
        const name = field.name;
        switch (name) {
          case 'radius':
            alert("radius = " + value);
            state.Params.radius = value;
            break;
          case 'type':
            alert("type = " + value);
            state.Params.type = value;
            break;
          case 'style':
            alert("style = " + value);
            state.Params.style = value;
          case 'state':
            alert("state = " + value);
            state.Params.stateCode = value;
          default:
            console.log(`Sorry, we are out of ${name}.`);
        };
      });

    // Is data filtering needed?
    if (state.Params.stateCode != "" || state.Params.type != "" || state.Params.style != "") {
      state.Params.filter = true;
    };
  };
};


// Still need to finish - Form Submissions listeners ???
//------------------------------------------------------
// state.Params.formDateCollection = [];
// form.addEventListener("submit", event => {
//   event.preventDefault();
//   Array.from(event.target.elements).forEach(el => {
//     console.log("Input Type: ", el.type);
//     console.log("Name: ", el.name);
//     console.log("Value: ", el.value);
//   });
// });


//**  Get the FMA Data from the data JSON file (works)
//*****************************************************
(function importDBJSON() {
  state.Params.fmaDBdata = [];
  fetch('https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/FMAData.json')
  .then(response => response.json())
  .then(response => {
    state.Params.fmaDBdata = response;
  })
  .catch(err => {
      // What to do when the request fails
      alert("Error with the DBdata import LINE 150. please try your search again.");
      console.log('The DBdata load request failed!');
      console.log('error', err);
    });
}) ();

//**  Get the ZIP Data from the data JSON file (works)
//*****************************************************
(function importZIPJSON() {
  state.Params.tempZipData = [];
  fetch('https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/ZIPdata.json')
  .then(response => response.json())
  .then(response => {
    state.Params.tempZipData = response;  // save JSON data here...
    })
  .catch(err => {
      // What to do when the request fails
      alert("Error with the ZIPdata import LINE 180. please try your search again.");
      console.log('The ZIPdata load request failed!');
      console.log('error', err);
    });
}) ();


// Search from Home Page form (this works)
//----------------------------------------
function zipCodeSearch() {
  // get user radio button selection on home page
  state.Params.type = form.querySelector('input[name="selectOptions"]:checked').value;
  if (state.Params.type !== "All") {
    state.Params.filter = true;
  };
  // get user zip code input
  let userZipCode = document.getElementById("zipSearch").value;
  if (userZipCode == "") {
    alert("A Zip Code Is required");
    return
  } else {
    state.Params.zipCode = userZipCode;
  };

  //*** Uncomment for demo day ***
  // state.Params.returnedAPIdata = [];
  // state.Params.returnedAPIdata = getAPIData();
  // console.log(state.Params.returnedAPIdata);  // for testing
  // compareTheData(state.Params.fmaDBdata, state.Params.returnedAPIdata);
  
  // for testing only
  alert("Going to compareTheData");
  compareTheData(state.Params.fmaDBdata, state.Params.tempZipData);
  // compareTheData(tempDBdata, demoAPIdata);
};


// search bar filtering on results page (Not WORKING)
//-----------------------------------------------------------
function searchBarSubmit() {
  state.Params.zipCode = document.getElementById("zipSearch").value;
  let radiusDropdown = document.querySelector("#radiusSearch");
  state.Params.radius = radiusDropdown.options[radiusDropdown.selectedIndex].value;  
  let stateDropdown = document.querySelector("#stateSearch");
  state.Params.stateCode = stateDropdown.options[stateDropdown.selectedIndex].value;
  state.Params.stateText = stateDropdown.options[stateDropdown.selectedIndex].text;
    console.log(stateCode, stateText);  // for testing
  let typeDropdown = document.querySelector("#typeSearch");
  state.Params.type = typeDropdown.options[typeDropdown.selectedIndex].value;
    console.log(state.Params.type);  // for testing
  let styleDropdown = document.querySelector("#styleSearch");
  state.Params.style = styleDropdown.options[styleDropdown.selectedIndex].value;
    console.log(style);  // for testing
  // Is data filtering needed?
  if (state.Params.stateCode != "" || state.Params.type != "" || state.Params.style != "") {
    state.Params.filter = true;
  };
  
  //*** Uncomment for demo day ***
  // state.Params.returnedAPIdata = [];
  // state.Params.returnedAPIdata = getAPIData();
  // console.log(state.Params.returnedAPIdata);  
  // compareTheData(state.Params.fmaDBdata, state.Params.returnedAPIdata);

  // for testing only
  console.log(`variables ... ${state.Params.zipCode} -  ${state.Params.stateCode} - ${state.Params.stateText} - ${state.Params.radius} - ${state.Params.type} - ${state.Params.style} - ${state.Params.filter}`);  alert("Going to compareTheData");
  compareTheData(state.Params.fmaDBdata, state.Params.tempZipData);
  // compareTheData(tempDBdata, demoAPIdata);
};


// functions to COMPARE Data (this works)
//*****************************************
export function compareTheData(dbData, zipData) {
  state.Params.comparedData = [];
  zipData.forEach((zipItem) => {
    for(let i=0; i <= dbData.length-1; i++) {
      if (zipItem.ZipCode === dbData[i].ZipCode) {
        let tempItem = (dbData[i]);
        console.log(dbData[i])
        // Pull the distance from target into data collection
        tempItem.Distance = (zipItem.Distance)
        if (!tempItem.Distance || tempItem.Distance == "0") {
          tempItem.Distance = "Only a mile or so";
        };
        state.Params.comparedData.push(tempItem);
      }
    };
  });
  // check if filtering is needed?
  if (state.Params.filter) {
     alert("Going to filterData"); // for testing
    filterData(state.Params.comparedData);
  } else {
     alert("Going to writeResults"); // for testing
    writeResults(state.Params.comparedData);
  };
};


//** FILTER according to search criteria (mostly works)
//*******************************************************
// ZipCode and radius already taken care of at this point
// stateCode -- takes 2 alpha character code
// stateText -- full state name
// style -- Arnis, Escrima, Kali, or All
// type -- club, group, school, event, or All
function filterData(zipAndRadiusData) {
  state.Params.filteredData = [];
  // check for STATE filter
  let stateData = [];
  if (state.Params.stateCode != "" || state.Params.stateText != "") {
    console.log("stateCode = " + state.Params.stateCode + " and stateText = " + state.Params.stateText);
    zipAndRadiusData.forEach((dataItem1) => {
      if (dataItem1.State === state.Params.stateCode || dataItem1.State === state.Params.stateText) {
        stateData.push(dataItem1);
      };
    });
    // for testing 
     console.log(stateData);
     alert("There was a state filter");
  };
  // check for STYLE filter
  let styleData = [];
  if (state.Params.style && (state.Params.state.Params.style != "All")) {
  	// if previous state filter results
    if (stateData.length >= 1) {
      stateData.forEach((dataItem2) => {
        if (dataItem2.Style === style) {
          styleData.push(dataItem2);
        };
      });
    } else {
    	// if not state filter results
      zipAndRadiusData.forEach((dataItem2) => {
        if (dataItem2.Style === state.Params.style) {
          styleData.push(dataItem2);
        };
      });
    };
    // for testing 
     console.log(styleData);
     alert("There was a style filter");
  };
  // check TYPE of venue filter
  if (state.Params.type && (state.Params.type !== "All")) {
  	// if previous style filter results
    if (styleData.length >= 1) {
      styleData.forEach((dataItem3) => {
        if (dataItem3.Type === state.Params.type) {
          state.Params.filteredData.push(dataItem3);
        };
      });
    } else if (stateData.length >= 1) {
  		// no style but previous state filter results    	
        stateData.forEach((dataItem3) => {
        if (dataItem3.Type === state.Params.type) {
          state.Params.filteredData.push(dataItem3);
        };
      });
    } else {
  		// no style nor any state filter results    	  	
        zipAndRadiusData.forEach((dataItem3) => {
        if (dataItem3.Type === state.Params.type) {
          state.Params.filteredData.push(dataItem3);
        };
      });
    };
    // for testing 
     console.log(state.Params.filteredData);
     alert("There was a type filter");
  };
  // print results to the screen
  alert("Going to print the results.");	// for testing
  writeResults(state.Params.filteredData);
};


//** Publish Data to result page ( mostly works)
//************************************************
function writeResults(printableData) {
  render(state.FMAresults);

	const container = document.querySelector('#container');

  if (printableData.length >= 1) {
		let i = 0;
		printableData.forEach((element) => {
			i++;
			let elementdiv = document.createElement("div");
      elementdiv.innerHTML = `
        <b>#${i} ${element.Name}</b><br/>
        &nbsp; ${element.Address},
        &nbsp; ${element.State}, ${element.ZipCode}<br />
        &nbsp; Phone : ${element.Phone}<br />
        &nbsp; Email : ${element.Email}<br />
        &nbsp; Web URL : ${element["Web URL"]}<br />
        &nbsp; Type : ${element.Type} &nbsp; &nbsp; Style : ${element.Style}<br />
        &nbsp; Distance : ${element.Distance}<br />
			`;
			container.appendChild(elementdiv);
		});
	} else {
    console.log("Error in writeResults function");
		alert("Nothing to print");
	  container.innerHTML = `
	    <div>
	        There seems to be no data for this search. We are very sorry. Please try a different search combination. <br />
	      </div>
	  `;
	};
};




// Interim Example DEMO data from API
//-------------------------------------
// {
//   "ZipCode": "62026",
//   "City": "EDWARDSVILLE",
//   "State": "Alabama",
//   "Latitude": 38.793699000000,
//   "Longitude": -89.998742000000,
//   "County": "MADISON",
//   "Distance": 3.04
// },

let demoAPIdata = [
  {
    "ZipCode": "62025",
    "City": "EDWARDSVILLE",
    "State": "IL",
    "Latitude": 38.855130000000,
    "Longitude": -89.948168000000,
    "County": "MADISON"
  },
  {
    "ZipCode": "99603",
    "City": "Homer",
    "State": "Alaska",
  },
  {
    "ZipCode": "85345",
    "City": "Peoria",
    "State": "Arizona",
  },
  {
    "ZipCode": "85629",
    "City": "Sahuarita",
    "State": "Arizona",
  },
  {
    "ZipCode": "62026",
    "City": "EDWARDSVILLE",
    "State": "Alabama",
    "Latitude": 38.793699000000,
    "Longitude": -89.998742000000,
    "County": "MADISON",
    "Distance": 3.04
  },
  {
    "ZipCode": "62067",
    "City": "MORO",
    "State": "IL",
    "Latitude": 38.932644000000,
    "Longitude": -89.990069000000,
    "County": "MADISON",
    "Distance": 4.80
  },
  {
    "ZipCode": "62084",
    "City": "ROXANA",
    "State": "IL",
    "Latitude": 38.844700000000,
    "Longitude": -90.062498000000,
    "County": "MADISON",
    "Distance": 6.21
  },
  {
    "ZipCode": "62046",
    "City": "HAMEL",
    "State": "IL",
    "Latitude": 38.894509000000,
    "Longitude": -89.843514000000,
    "County": "MADISON",
    "Distance": 6.26
  },
  {
    "ZipCode": "62087",
    "City": "SOUTH ROXANA",
    "State": "IL",
    "Latitude": 38.819596000000,
    "Longitude": -90.058492000000,
    "County": "MADISON",
    "Distance": 6.44
  },
  {
    "ZipCode": "62097",
    "City": "WORDEN",
    "State": "IL",
    "Latitude": 38.921846000000,
    "Longitude": -89.863757000000,
    "County": "MADISON",
    "Distance": 6.47
  },
  {
    "ZipCode": "62034",
    "City": "GLEN CARBON",
    "State": "IL",
    "Latitude": 38.756532000000,
    "Longitude": -89.957127000000,
    "County": "MADISON",
    "Distance": 6.82
  },
  {
    "ZipCode": "62095",
    "City": "WOOD RIVER",
    "State": "IL",
    "Latitude": 38.863044000000,
    "Longitude": -90.079284000000,
    "County": "MADISON",
    "Distance": 7.09
  },
  {
    "ZipCode": "62024",
    "City": "EAST ALTON",
    "State": "IL",
    "Latitude": 38.843500000000,
    "Longitude": -90.079158000000,
    "County": "MADISON",
    "Distance": 7.11
  },
  {
    "ZipCode": "62048",
    "City": "HARTFORD",
    "State": "IL",
    "Latitude": 38.825435000000,
    "Longitude": -90.088177000000,
    "County": "MADISON",
    "Distance": 7.83
  },
  {
    "ZipCode": "62010",
    "City": "BETHALTO",
    "State": "IL",
    "Latitude": 38.933678000000,
    "Longitude": -90.057447000000,
    "County": "MADISON",
    "Distance": 8.00
  },
  {
    "ZipCode": "62018",
    "City": "COTTAGE HILLS",
    "State": "IL",
    "Latitude": 38.909374000000,
    "Longitude": -90.086380000000,
    "County": "MADISON",
    "Distance": 8.34
  },
  {
    "ZipCode": "62021",
    "City": "DORSEY",
    "State": "IL",
    "Latitude": 38.981897000000,
    "Longitude": -89.977118000000,
    "County": "MADISON",
    "Distance": 8.88
  },
  {
    "ZipCode": "62062",
    "City": "MARYVILLE",
    "State": "IL",
    "Latitude": 38.725739000000,
    "Longitude": -89.965984000000,
    "County": "MADISON",
    "Distance": 8.98
  },
  {
    "ZipCode": "62061",
    "City": "MARINE",
    "State": "IL",
    "Latitude": 38.786202000000,
    "Longitude": -89.794306000000,
    "County": "MADISON",
    "Distance": 39.57
  },
  {
    "ZipCode": "62294",
    "City": "TROY",
    "State": "IL",
    "Latitude": 38.702961000000,
    "Longitude": -89.878857000000,
    "County": "MADISON",
    "Distance": 11.14
  },
  {
    "ZipCode": "62234",
    "City": "COLLINSVILLE",
    "State": "IL",
    "Latitude": 38.691315000000,
    "Longitude": -89.970639000000,
    "County": "MADISON",
    "Distance": 111.36
  },
  {
    "ZipCode": "62001",
    "City": "ALHAMBRA",
    "State": "IL",
    "Latitude": 38.881021000000,
    "Longitude": -89.739585000000,
    "County": "MADISON",
    "Distance": 12.39
  },
  {
    "ZipCode": "62002",
    "City": "ALTON",
    "State": "IL",
    "Latitude": 38.939095000000,
    "Longitude": -90.132125000000,
    "County": "MADISON",
    "Distance": 11.48
  },
  {
    "ZipCode": "62040",
    "City": "GRANITE CITY",
    "State": "IL",
    "Latitude": 38.732317000000,
    "Longitude": -90.106957000000,
    "County": "MADISON",
    "Distance": 22.05
  }
];


// Interim Example FMA data from Dataset
//---------------------------------------
// {
//   "Name": "Dynamic Mixed martial Arts - Mr. Brendan Neal",
//   "Address": "1324 Essec Drive, Edwardsville",
//   "ZipCode": "62025",
//   "State": "Illinois",
//   "Phone": "[618] 679-9713",
//   "Email": "Email",
//   "Web URL": "www.edwardsvilleymca.com",
//   "Type": "Club",
//   "Style": "Escrima"
// },

let tempDBdata = [
  {
    "Name": "Dynamic Mixed martial Arts - Mr. Brendan Neal",
    "Address": "1324 Essec Drive, Edwardsville",
    "ZipCode": "62025",
    "State": "Illinois",
    "Phone": "[618] 679-9713",
    "Email": "Email",
    "Web URL": "www.edwardsvilleymca.com",
    "Type": "Club",
    "Style": "Escrima"
  },
  {
    "Name": "Dynamic Mixed martial Arts - Mr. Brendan Neal",
    "Address": "1324 Essec Drive, Edwardsville",
    "ZipCode": "62026",
    "State": "Illinois",
    "Phone": "[618] 679-9713",
    "Email": "Email",
    "Web URL": "www.edwardsvilleymca.com",
    "Type": "Club",
    "Style": "Escrima"
  },
  {
    "Name": "K-Bay Martial Arts Warrior Training Center & Gym",
    "Address": "601 E Pioneer Ave, Suite 117, Homer",
    "ZipCode": "99603",
    "State": "Alaska",
    "Phone": null,
    "Web URL": "https://www.facebook.com/KBayWarriorTrainingCenter",
    "null-Address": "kachemakbay.martialarts@gmail.com",
    "Type": "School",
    "Style": ""
  },
  {
    "Name": "Arizona Filipino Martial Arts",
    "Address": "318 North 5th Avenue, Phoenix ",
    "ZipCode": "85003",
    "State": "Arizona",
    "Phone": "[602] 6799713",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Arnis Balite",
    "Address": "Peoria ",
    "ZipCode": "85345",
    "State": "Arizona",
    "Phone": null,
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": "Arnis"
  },
  {
    "Name": "Comprehensive Fighting Systems",
    "Address": "Sahuarita ",
    "ZipCode": "85629",
    "State": "Arizona",
    "Phone": "[575] 3084632",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Direct Torres Eskrima International",
    "Address": "Mesa ",
    "ZipCode": "85213",
    "State": "Arizona",
    "Phone": null,
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": "Eskrima"
  },
  {
    "Name": "DTE Eskrima",
    "Address": "1409 W. Indian School Rd., Phoenix ",
    "ZipCode": null,
    "State": "Arizona",
    "Phone": "[480] 3319885",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": "Eskrima"
  },
  {
    "Name": "ESAELD Panuntukan/JKD",
    "Address": "Val Vista Dr & Guadalupe Rd., Gilbert ",
    "ZipCode": "85234",
    "State": "Arizona",
    "Phone": null,
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "FTMA Arizona Chapter",
    "Address": "Phoenix ",
    "ZipCode": null,
    "State": "Arizona",
    "Phone": "[480] 3433362",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Full Circle Martial Arts",
    "Address": "Glendale ",
    "ZipCode": null,
    "State": "Arizona",
    "Phone": "[623] 7556720",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Gerald Toki School of Kali",
    "Address": "7171 W Discovery Dr, Glendale ",
    "ZipCode": "85303",
    "State": "Arizona",
    "Phone": "[623] 3329367",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": "Kali"
  },
  {
    "Name": "NavaSticks FMA",
    "Address": "North Central Phoenix ",
    "ZipCode": "85032",
    "State": "Arizona",
    "Phone": "[480] 7071141 ",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Phoenix Combat Escrima ",
    "Address": "Phoenix AZ",
    "ZipCode": null,
    "State": "Arizona",
    "Phone": "[602] 3589520 ",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": "Escrima"
  },
  {
    "Name": "Progressive Arnis Tucson Arizona",
    "Address": "7320 N. La Cholla Blvd. #164, Tucson ",
    "ZipCode": "85741",
    "State": "Arizona",
    "Phone": null,
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": "Arnis"
  },
  {
    "Name": "Southwest Martial Arts",
    "Address": "2356 W. Jasper Butte Dr., Queen Creek ",
    "ZipCode": "85242",
    "State": "Arizona",
    "Phone": "[480] 9875116",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Stick Fighter Training Center",
    "Address": "Tucson ",
    "ZipCode": "85745",
    "State": "Arizona",
    "Phone": "[520] 9559243",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Conway Karate Jujitsu Escrima",
    "Address": "Conway ",
    "ZipCode": "72127",
    "State": "Arkansas",
    "Phone": "[501] 3545843",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": "Escrima"
  },
  {
    "Name": "HAMA/Sanano Arnis Trecehampas",
    "Address": "1002 E. Main St., Cabot ",
    "ZipCode": "72023",
    "State": "Arkansas",
    "Phone": "[501] 6061722",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  },
  {
    "Name": "Malmo Martial Arts",
    "Address": "P.O. Box 654, Bentonville ",
    "ZipCode": "72712",
    "State": "Arkansas",
    "Phone": "[479] 6404455",
    "Web URL": null,
    "null-Address": null,
    "Type": "school",
    "Style": ""
  }
];
