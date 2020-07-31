import { Header, Main, Footer } from "./components";

function render() {
  document.querySelector("#root").innerHTML = `
  ${Header()}
  ${Main()}
  ${Footer()}
  `;
};

render();


//***************************************
// *** Build Reusable HTML Components ***
//***************************************

// generat a Random Image for the side panel
//-------------------------------------------
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
  randomName = imageNames[rand];
  randomURL = imageURL + randomName + "?raw=true";
  return randomURL;
};

buildRandomURL(imageNames, imageURL)

document.querySelector('.addOrImage').innerHTML = `
  <img id="imgFMAfighters" src="${randomURL}" alt="General Filipino martial Artists images about Arnis, Escrima, and Kali."/>
`;

document.querySelector('#hpAddInfoButton').innerHTML = `
  <a href="AddInfo.html">Click here to ADD a club, group, school or event</a>
`;


// Constant for Forms to clear form data
const form = document.querySelector('form');


//*********************************
//***  Search filter options  *****
//*********************************
let zipCode = "";
let selectButton = "";
let state = "";
let radius = "";
let type = "";
let style = "";


// function for home page form
//=============================
function zipcodeSearch() {
  // get user zip code input
  zipCode = document.getElementById("zipSearch").value;
  // get user radio button selection on home page
  selectButton = form.querySelector('input[name="selectOptions"]:checked').value;
  console.log(`Zip Code = ${zipCode}, and selectButton = ${selectButton}`);

  // return getZipCodeData(zipCode, radius);
};


// function for search bar filtering on results page
//====================================================
function searchBarSubmit() {
  // get user zip code input
  zipCode = document.getElementById("zipSearch").value;

  // get user state selection
  let stateDropdown = document.querySelector("#stateSearch");
  state = stateDropdown.options[stateDropdown.selectedIndex].value;

  // get user search radius
  let radiusDropdown = document.querySelector("#radiusSearch");
  radius = radiusDropdown.options[radiusDropdown.selectedIndex].value;

  // get user type selection
  let typeDropdown = document.querySelector("#typeSearch");
  type = typeDropdown.options[typeDropdown.selectedIndex].value;

  // get user style selection
  let styleDropdown = document.querySelector("#styleSearch");
  style = styleDropdown.options[styleDropdown.selectedIndex].value;

  console.log(zipCode, state, radius, type, style);

  // return getZipCodeData(zipCode, radius);
};


//***************************************
// Steps to GET Zip Code Data from API
//***************************************
let returnData = [];  // API Return data

// Get the API data with a API call
function getZipCodeData(zipCode, radius = 5) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(`"https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=DEMOAPIKEY"`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      returnData = results;
      }
    )
    .catch(error => console.log('error', error));
};


//************************************
// Get the FMA JSON Data from file
//************************************
let databaseData = [];  // for the FMA DB data

// To import the JSON data from a file
function importJSON() {
  fetch('./FMAdata.json').then(
    response => {
      return response.json();
    }).then(
      data => {
        // Work with JSON data here..
        databaseData = data;
        console.log(data);

        return compareTheData(data, demoAPIdata);

      }).catch(
        err => {
          // What to do when the request fails
          console.log('The request failed!');
          console.log('error', err);
        });
};

importJSON();


//**************************************************
// Functions to Manipulate and sort the Datasets
//**************************************************

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
      "ZipCode": "62026",
      "City": "EDWARDSVILLE",
      "State": "IL",
      "Latitude": 38.793699000000,
      "Longitude": -89.998742000000,
      "County": "MADISON",
      "Distance": 5.04
    },
    {
      "ZipCode": "62067",
      "City": "MORO",
      "State": "IL",
      "Latitude": 38.932644000000,
      "Longitude": -89.990069000000,
      "County": "MADISON",
      "Distance": 5.80
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
      "Distance": 9.57
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
      "Distance": 11.36
    },
    {
      "ZipCode": "62001",
      "City": "ALHAMBRA",
      "State": "IL",
      "Latitude": 38.881021000000,
      "Longitude": -89.739585000000,
      "County": "MADISON",
      "Distance": 11.39
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
      "Distance": 12.05
    }
  ];
  // {
  //   "ZipCode": "62025",
  //   "City": "EDWARDSVILLE",
  //   "State": "IL",
  //   "Latitude": 38.855130000000,
  //   "Longitude": -89.948168000000,
  //   "County": "MADISON"
  // },
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
      "Name": "K-Bay Martial Arts Warrior Training Center & Gym",
      "Address": "601 E Pioneer Ave, Suite 117, Homer",
      "Zip Code": "99603",
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
      "Zip Code": "85003",
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
      "Zip Code": "85345",
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
      "Zip Code": "85629",
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
      "Zip Code": "85213",
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
      "Zip Code": null,
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
      "Zip Code": "85234",
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
      "Zip Code": null,
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
      "Zip Code": null,
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
      "Zip Code": "85303",
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
      "Zip Code": "85032",
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
      "Zip Code": null,
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
      "Zip Code": "85741",
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
      "Zip Code": "85242",
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
      "Zip Code": "85745",
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
      "Zip Code": "72127",
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
      "Zip Code": "72023",
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
      "Zip Code": "72712",
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
  // {
  // "Name": "Arizona Filipino Martial Arts",
  // "Address": "318 North 5th Avenue, Phoenix ",
  // "ZipCode": "85003",
  // "State": "Arizona",
  // "Phone": "[602] 6799713",
  // "Email": "Email",
  // "Web URL": "Web URL",
  // "Type": "school",
  // "Style": ""
  // },


let comparedData = [];  // To comparison - API and DB data

// function to Compare API and DB data  
function compareTheData(dbData, apiData) {
  for(i=0; i <= dbData.length-1; i++) {
    if (apiData.includes(dbData[i].ZipCode)) {
      comparedData.push(dbData[i]);
    };
  console.log(dbData[i]);
  };

};

// compareTheData(tempDBdata, demoAPIdata);

console.log(comparedData);
