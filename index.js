//**********************
// ***SPA Components ***
//**********************
import { Header, Main, Footer } from "./components";
import * as state from "./store"

// NAVIGO AND LODASH
import Navigo from "navigo";
import { capitalize } from "lodash";
// Navigo Router
const router = new Navigo(location.origin);
router.on({
  "/": () => render(state.Home),
  ":page": params => {
    let routEntered = params.page;
    let formattedRoute = capitalize(routEntered);
    let pieceOfState = state[formattedRoute];
    render(pieceOfState);
  }
}).resolve();

// Render SPA
function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header()}
  ${Main(st)}
  ${Footer()}
  `;
  router.updatePageLinks();

  addBannerEventListener();
  addDisclaimerEventListener();
  addButtonsEventListener()
};
render(state.Home);


//**************************************
//**************************************
//*** Build Reusable HTML Components ***
//**************************************
//**************************************

// generate a Random Image for the side panel
//=============================================
let imageNames = ["FMAimages1.jpg", "FMAimages2.jpg", "FMAimages3.jpg", "FMAimages4.jpg", "FMAimages5.jpg", "FMAimages6.jpg", "FMAimages7.jpg", "FMAimages8.jpg", "FMAimages9.jpg", "FMAimages10.jpg", "FMAimages11.jpg", "FMAimages12.jpg", "FMAimages13.jpg", "FMAimages14.jpg", "FMAimages15.jpg", "FMAimages16.jpg", "FMAimages17.jpg", "FMAimages18.jpg", "FMAimages19.jpg", "FMAimages20.jpg", "FMAimages21.jpg", "FMAimages22.jpg", "FMAimages23.jpg", "FMAimages24.jpg", "FMAimages25.jpg", "FMAimages26.jpg", "FMAimages27.jpg", "FMAimages28.jpg", "FMAimages29.jpg"];
let imageURL = "https://github.com/JohanBester/JBBesterCapstoneProject/blob/master/FMAimages/";
let randomURL = "";

// Function to generate a random number
const randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

// Function to build random image URL
function buildRandomURL(imageNames, imageURL) {
  let rand = randomNumber(1, imageNames.length);
  let randomName = imageNames[rand];
  randomURL = imageURL + randomName + "?raw=true";
  return randomURL;
};

buildRandomURL(imageNames, imageURL);

document.querySelector('.addOrImage').innerHTML = `
  <img id="imgFMAfighters" src="${randomURL}" alt="General Filipino martial Artists images about Arnis, Escrima, and Kali."/>
`;

document.querySelector('#hpAddInfoButton').innerHTML = `
  <a href="AddInfo.html">Click here to ADD a club, group, school or event</a>
`;


// Constant for Forms to clear form data
//=========================================
const form = document.querySelector('form');


//====================
// Header navigation
//====================
function addBannerEventListener() {
  let banner = document.querySelectorAll("header.a")
  banner.forEach(link =>
    link.addEventListener("click", event => {
      event.preventDefault();
      render(state.Home);
    })
  );
};


//====================
// Footer navigation
//====================  #disclaimers > a
function addDisclaimerEventListener() {
  document.querySelector("#disclaimers > a").addEventListener("click", event => {
    event.preventDefault();
    render(state.Disclaimers);
  });
};

function addButtonsEventListener() {
  let buttons = document.querySelectorAll(".fixed-footer #navButtons a");
  buttons.forEach(link =>
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = capitalize(event.target.text);
      let pieceOfState = state[linkText];
      console.log(pieceOfState);  // testing only
      render(pieceOfState);
    })
  );
};


//********************************************************
//********************************************************
//**  Get the FMA JSON Data from the data source file  ***
//********************************************************
//********************************************************

let databaseData = [];  // for the FMA DB data
importJSON();	// import JSON data

// Function To import the JSON data from a file
//=============================================
function importJSON() {
  fetch('https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/FMAData.json').then(
    response => {
      return response.json();
    }).then(data => {
        // Work with JSON data here...
        databaseData = data;
        // console.log("databaseData holds... " + databaseData);
      }
    )
    .catch(err => {
        // What to do when the request fails
        alert("We are sorry, something seems to have gone wrong. please try your search again.");
        console.log('The data load request failed!');
        console.log('error', err);
        return location.reload();
      });
};


//********************************************
//********************************************
//***  Search and Search filter options  *****
//********************************************
//********************************************

let zipCode = "62025";
let stateCode = "";
let stateText = "";
let radius = "50";
let type = "";
let style = "";

let newZipSearch = true;
let newRadiusSearch = false;
let filter = false

// function for home page form
//=============================
function zipcodeSearch() {
  // get user zip code input
  zipCode = document.getElementById("zipSearch").value;

  // get user radio button selection on home page
  type = form.querySelector('input[name="selectOptions"]:checked').value;
  if (type !== "all") {
    filter = true;
  };

  // Test what variables are captured
  // alert(`Zip Code = ${zipCode}, type = ${type}, and filter = ${filter}`);

  compareTheData(tempDBdata, demoAPIdata);  // for testing only

  // return getZipCodeData(zipCode, radius);  // with default radius value
};


// function for search bar filtering on results page
//====================================================
function searchBarSubmit() {
  // check user zip code input
  let newZipCode = document.getElementById("zipSearch").value;
  // Compare zipcodes - is a new API call needed?
  (zipCode == newZipCode ? newZipSearch = false : zipCode = newZipCode);
  alert("the value of newZipCode = " + newZipCode);	// for testing

  // check user search radius
  let radiusDropdown = document.querySelector("#radiusSearch");
  let newRadius = radiusDropdown.options[radiusDropdown.selectedIndex].value;

  //compare raduises - is new API call needed?
  if (!newRadius == "") {
    if (radius < newRadius) {
    	newZipSearch = true;	// new API call needed
    } else {
      radius = newRadius;
    	newRadiusSearch = true;	// filter for new radius
    };
  };
  alert("radius = " + radius + " newRadius = " + newRadius);	// for testing

  // check user State selection
  let stateDropdown = document.querySelector("#stateSearch");
  stateCode = stateDropdown.options[stateDropdown.selectedIndex].value;
  stateText = stateDropdown.options[stateDropdown.selectedIndex].text;

  // check user type selection
  let typeDropdown = document.querySelector("#typeSearch");
  type = typeDropdown.options[typeDropdown.selectedIndex].value;

  // check user style selection
  let styleDropdown = document.querySelector("#styleSearch");
  style = styleDropdown.options[styleDropdown.selectedIndex].value;

  // Is data filtering neede?
  if (stateCode || type || style) {
    filter = true;
  };

  // Test what variables are captured from form
  alert(`variables ... ${zipCode} -  ${stateCode} - ${stateText} - ${radius} - ${type} - ${style} - ${filter}`);

  if (newZipSearch == true) {
    alert("New API search needed");  // for testing only
    // Get new zip code search data from the API
    // return getZipCodeData(zipCode, radius);

  } else if (newRadiusSearch == true) {
	alert("Smaller radius needed");  // for testing only
	// if smaller radius data is needed
	return smallerRadius(comparedData);

  } else if (filter == true) {
	alert("Filtering needed - Filter = " + filter);  // for testing only
	// only data filtering is needed
	return filterData(comparedData);

  } else {
	  // nothing needed only print data
    return writeResults(comparedData);
  };
};

//***************************************
//***************************************
// Steps to GET Zip Code Data from API
//***************************************
//***************************************
// getZipCodeData(zipCode, radius);  // this is temp for testing

let returnedAPIdata = [];  // API Return data

// Get the API data with a API call
// Radius default value set to 50 miles
function getZipCodeData(zipCode = 62025, radius = 50) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=XGSIV5GV93YJPD7VVM8G`, requestOptions)
    .then(response => response.json())
    .then(results => {
      returnedAPIdata = results.DataList;
      // console.log("returnedAPIdata holds... " + returnedAPIdata);
      return compareTheData(databaseData, returnedAPIdata);
      }
    )
    .catch(err => {
        // What to do when the request fails
        alert ("There seems to have been a problem with this search. Kindly please try that again.");
        console.log('The API request failed!');
        console.log('error', err);
        return location.reload();}
      );
};


//**************************************************
//**************************************************
//**  functions to COMPARE Data in the Datasets  ***
//**************************************************
//**************************************************

let comparedData = [];  // To hold comparison API and DB data

// function to Compare API and DB data
//=====================================
function compareTheData(dbData, apiData) {
  apiData.forEach((apiItem) => {
    for(let i=0; i <= dbData.length-1; i++) {
      if (apiItem.ZipCode === dbData[i].ZipCode) {
        let tempItem = (dbData[i]);

        // Pull in the distance from target item into data collection
        if (!apiItem.Distance) {
          tempItem.Distance = "Only a mile or so";
        } else {
          tempItem.Distance = (apiItem.Distance)
        };
    
        comparedData.push(tempItem);
      }
    }
  });

  // console.log(comparedData);	// for testing

  if (comparedData.length >= 1) {
  	// check if filtering is needed?
    (filter ? filterData(comparedData) : writeResults(comparedData));
  } else {
    alert("There seems to have been a problem with this search. Kindly please try that again.");
    // return location.reload();
  };
};

// compareTheData(tempDBdata, demoAPIdata);  // for testing only

//**********************************************
//**********************************************
//***  Smaller Radius Search from search bar ***
//**********************************************
//**********************************************

let newRadiusData = [];

function smallerRadius(dataSet) {
  if (dataSet.length >= 1) {
    dataSet.forEach((item) => {
      if (item.Distance <= newRadius) {
        newRadiusData.push(item);
      };
    });
  };

  // for testing only
  console.log(newRadiusData);
  alert("Reduced radius calculated");

  if (newRadiusData.length >= 1) {
  	// check if filtering is needed?
    (filter ? filterData(newRadiusData) : writeResults(newRadiusData));
  } else {
    alert("There seems to have been a problem with this search. Kindly please try that again.");
    // return location.reload();
  };
};


//****************************************************************
//****************************************************************
//** Functions to FILTER New Data according to search criteria ***
//****************************************************************
//****************************************************************
// ZipCode and radius already taken care of at this point
// stateCode -- 2 alpha character code
// stateText -- full state name
// style -- arnis, escrima, kali, or all
// type -- club, group, school, event, or all

let filteredData = [];

// function to filter data to user preferences
//=============================================
function filterData(zipAndRadiusData) {
  alert("Filtering the data ...");	// for testing only
  
  let stateData = [];
  let styleData = [];

  // check for STATE filter
  if (stateCode || stateText) {
    zipAndRadiusData.forEach((dataItem1) => {
      if (dataItem1.State === stateCode || dataItem1.State === stateText) {
        stateData.push(dataItem1);
      };
    });

    // for testing 
    console.log(stateData);
    alert("There was a state filter");
  };

  // check for STYLE filter
  if (style && (style !== "all")) {
  	// if there are previous state filter results
    if (stateData.length >= 1) {
      stateData.forEach((dataItem2) => {
        if (dataItem2.Style === style) {
          styleData.push(dataItem2);
        };
      });
    } else {
    	// if not state filter results
      zipAndRadiusData.forEach((dataItem2) => {
        if (dataItem2.Style === style) {
          styleData.push(dataItem2);
        };
      });
    };

    // for testing 
    console.log(styleData);
    alert("There was a style filter");

  };

  // check TYPE of venue filter
  if (type && (type !== "all")) {
  	// if there are previous style filter results
    if (styleData.length >= 1) {
      styleData.forEach((dataItem3) => {
        if (dataItem3.Type === type) {
          filteredData.push(dataItem3);
        };
      });
    } else if (stateData.length >= 1) {
  		// if no style but there are previous state filter results    	
        stateData.forEach((dataItem3) => {
        if (dataItem3.Type === type) {
          filteredData.push(dataItem3);
        };
      });
    } else {
  		// if no style nore state filter results    	  	
        zipAndRadiusData.forEach((dataItem3) => {
        if (dataItem3.Type === type) {
          filteredData.push(dataItem3);
        };
      });
    };

    // for testing 
    console.log(filteredData);
    alert("There was a type filter");
  };

  return writeResults(filteredData);
};


//*******************************************************
//*******************************************************
//** Functions to Publish Search Data to result page ***
//*******************************************************
//*******************************************************
function writeResults(printableData) {

	const container = document.querySelector('#container');
	alert("About to print...");	// for testing

	if (printableData.length >= 1) {
		let i = 0;
		printableData.forEach((element) => {
			i++;
			let elementdiv = document.createElement("div");
      elementdiv.innerHTML = `
        <b>#${i} ${element.Name}</b><br/>
        &nbsp; ${element.Address},<br />
        &nbsp; ${element.State}, ${element.ZipCode}<br />
        &nbsp; Phone : ${element.Phone}<br />
        &nbsp; Email : ${element.Email}<br />
        &nbsp; Type : ${element.Type} &nbsp; &nbsp; Style : ${element.Style}<br />
        &nbsp; Distance : ${element.Distance}<br />
			`;

			container.appendChild(elementdiv);
		});

	} else {
		alert("Nothing to print");
	    // container.innerHTML = `
	    //   <div>
	    //     There seems to be no data for this search. We are very sorry. Please try a different search combination. <br />
	    //   </div>
	    // `;
	};
};

// Interim Example DEMO data from API
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
// {
//   "ZipCode": "62026",
//   "City": "EDWARDSVILLE",
//   "State": "IL",
//   "Latitude": 38.793699000000,
//   "Longitude": -89.998742000000,
//   "County": "MADISON",
//   "Distance": 5.04
// },

// Interim Example FMA data from DB
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
