//***************************************
// *** Build Reusable HTML Components ***
//***************************************

document.querySelector('header').innerHTML = `
<a href="./index.html"><img class="logo" src="IMAGES/FMAlogo.jpg" /></a>
<div class="appname">
  <a href="./index.html">
  <span class="appname1">STIX </span>
  <span class="appname2">FMA Fun Finder</span></div></header></a>
`;

document.querySelector('.addOrImage').innerHTML = `
  <img id="imgFMAfighters" src="./IMAGES/filipino-martial-arts-arnis-escrima-kali-stick-fighting.png" alt="Silhouette of two Filipino martial Artists stick fighting"/>
  <p> Place Add or Image here for wider screen layouts</p>
`;

document.querySelector('footer').innerHTML = `
    <div id="disclaimers">
    <a href="disclaimers.html">
      <h6 class="disTop">Disclaimer:</h6>
      <p class="disText">Click here to read the FMA disclaimers. Copyright © Fun Finder Applications, Illinois, USA. 2020. All Rights Reserved.</p>
    </a>
    </div>
    <div id="navButtons">
      <button id="btnAbout" class="btnStyled" type="button"><a href="./about.html">ABOUT</a></button>
      <button id="btnHome" class="btnStyled" type="button"><a href="./index.html">HOME</a></button>
      <button id="btnContact" class="btnStyled" type="button"><a href="./contact.html">CONTACT</a></button>
    </div>
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
      "ZipCode": 62025,
      "State": "Illinois",
      "Phone": "[618] 679-9713",
      "Email": "Email",
      "Web URL": "www.edwardsvilleymca.com",
      "Type": "Club",
      "Style": "Escrima"
    },
    {
      "Name": "Arizona Filipino Martial Arts",
      "Address": "318 North 5th Avenue, Phoenix ",
      "ZipCode": 85003,
      "State": "Arizona",
      "Phone": "[602] 6799713",
      "Email": "Email",
      "Web URL": "Web URL",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Arnis Balite",
      "Address": "Peoria ",
      "ZipCode": 85345,
      "State": "Arizona",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Comprehensive Fighting Systems",
      "Address": "Sahuarita ",
      "ZipCode": 85629,
      "State": "Arizona",
      "Phone": "[575] 3084632",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Direct Torres Eskrima International",
      "Address": "Mesa ",
      "ZipCode": 85213,
      "State": "Arizona",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "DTE Eskrima",
      "Address": "1409 W. Indian School Rd., Phoenix ",
      "ZipCode": "",
      "State": "Arizona",
      "Phone": "[480] 3319885",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "ESAELD Panuntukan/JKD",
      "Address": "Val Vista Dr & Guadalupe Rd., Gilbert ",
      "ZipCode": 85234,
      "State": "Arizona",
      "Phone": " ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Full Circle Martial Arts",
      "Address": "Glendale ",
      "ZipCode": "",
      "State": "Arizona",
      "Phone": "[623] 7556720",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "FTMA Arizona Chapter",
      "Address": "Phoenix ",
      "ZipCode": "",
      "State": "Arizona",
      "Phone": "[480] 3433362",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Gerald Toki School of Kali",
      "Address": "7171 W Discovery Dr, Glendale ",
      "ZipCode": 85303,
      "State": "Arizona",
      "Phone": "[623] 3329367",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "NavaSticks FMA",
      "Address": "North Central Phoenix ",
      "ZipCode": 85032,
      "State": "Arizona",
      "Phone": "[480] 7071141 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Phoenix Combat Escrima ",
      "Address": "Phoenix AZ",
      "ZipCode": "",
      "State": "Arizona",
      "Phone": "[602] 3589520 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Progressive Arnis Tucson Arizona",
      "Address": "7320 N. La Cholla Blvd. #164, Tucson ",
      "ZipCode": 85741,
      "State": "Arizona",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Southwest Martial Arts",
      "Address": "2356 W. Jasper Butte Dr., Queen Creek ",
      "ZipCode": 85242,
      "State": "Arizona",
      "Phone": "[480] 9875116",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Stick Fighter Training Center",
      "Address": "Tucson ",
      "ZipCode": 85745,
      "State": "Arizona",
      "Phone": "[520] 9559243",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Malmo Martial Arts",
      "Address": "P.O. Box 654, Bentonville ",
      "ZipCode": 72712,
      "State": "Arkansas",
      "Phone": "[479] 6404455",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Conway Karate Jujitsu Escrima",
      "Address": "Conway ",
      "ZipCode": 72127,
      "State": "Arkansas",
      "Phone": "[501] 3545843",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "HAMA/Sanano Arnis Trecehampas",
      "Address": "1002 E. Main St., Cabot ",
      "ZipCode": 72023,
      "State": "Arkansas",
      "Phone": "[501] 6061722",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "PTK Arkansas",
      "Address": "Fort Smith ",
      "ZipCode": 72903,
      "State": "Arkansas",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "American Karate Academy (Latosa Escrima)",
      "Address": "424 Moore Lane, Healdsburg ",
      "ZipCode": "",
      "State": "California",
      "Phone": "[707] 4334717",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Atillo Balintawak",
      "Address": "38550 Florence St., Beaumont ",
      "ZipCode": 92223,
      "State": "California",
      "Phone": "[909] 3636435",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "BabaoArnis Academy",
      "Address": "1143 Antoine Dr., San Diego ",
      "ZipCode": 92139,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Backyard BrotherhoodUna Sa Laban",
      "Address": "Salinas ",
      "ZipCode": 93906,
      "State": "California",
      "Phone": "[417] 2523441",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Bahala Na MultiStyle ",
      "Address": "Filipino Plaza 6 West Main St., Stockton",
      "ZipCode": "",
      "State": "California",
      "Phone": "[209] 9818084",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Bais Tres Manos (KalisSilatKuntaw) ",
      "Address": "12 Panaroma Dr. AptD, Vallejo ",
      "ZipCode": 94589,
      "State": "California",
      "Phone": "[925] 4516728",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Balintawak Arnis Academy",
      "Address": "Bayanihan Center, Seafood Plaza, 3495 Sonoma `Blvd, Vallejo ",
      "ZipCode": 94589,
      "State": "California",
      "Phone": "[707] 3424448",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Bandalan Doce Pares",
      "Address": "6081 Killarney Ave., Garden Grove ",
      "ZipCode": 92845,
      "State": "California",
      "Phone": "[714] 8925271 / [714] 8988497",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "B.A.S.H. Combatives Fitmess",
      "Address": "2934 N. Beverly Glen Circle #270, Los Angeles ",
      "ZipCode": 90077,
      "State": "California",
      "Phone": "[310] 8502515",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Bay Area Serrada Escrima",
      "Address": "P.O. Box 21716, El Sobrante ",
      "ZipCode": 94820,
      "State": "California",
      "Phone": "[510] 2220332",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "BlaysHalla Battle Academy",
      "Address": "Orange",
      "ZipCode": "",
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Cabales Serrada Escrima",
      "Address": "136 E Harding Way, Stockton ",
      "ZipCode": 95207,
      "State": "California",
      "Phone": "[209] 5982384",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Capital Doce Pares",
      "Address": "2197 Chase Drive Bldg. #2, Rancho Cordova ",
      "ZipCode": 95670,
      "State": "California",
      "Phone": "[916] 8635278",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Cardenas School of Modern Arnis/Arnis de Mano",
      "Address": "2605 Hoover Ave., National City ",
      "ZipCode": 91950,
      "State": "California",
      "Phone": "[619] 3391418",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Center for Practical Self Defense (Combat Jujutsu and Filipino Fighting Methodology)",
      "Address": "Riverside, California",
      "ZipCode": "",
      "State": "California",
      "Phone": "[909] 2343015",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Combative Martial Arts Systems",
      "Address": "1670 West 162nd St., Gardena ",
      "ZipCode": 90247,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Dakip Diwa Martial Arts",
      "Address": "Antioch 94509",
      "ZipCode": "",
      "State": "California",
      "Phone": "[925] 8487389",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Decuerdas Self Defense Organization",
      "Address": "960 Shortland Circle, Manteca ",
      "ZipCode": 95337,
      "State": "California",
      "Phone": "[209] 6087826",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Delta One Martial Arts (Senkotiros)",
      "Address": "3385 Deer Valley Road, Antioch ",
      "ZipCode": 94531,
      "State": "California",
      "Phone": "[925] 7531167",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Doce Pares",
      "Address": "2391 Cashaw Way, Sacramento ",
      "ZipCode": 95834,
      "State": "California",
      "Phone": "[916] 2481802 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Doce Pares Sacramento",
      "Address": "65 Quint Ct. Suite J, Sacramento ",
      "ZipCode": 95823,
      "State": "California",
      "Phone": "[916] 3750745",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Dublin Martial Arts Academy",
      "Address": "Dublin ",
      "ZipCode": 94568,
      "State": "California",
      "Phone": "[925] 2360076",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "ESKABO Da'an",
      "Address": "1475 Polk St #11, San Francisco ",
      "ZipCode": 94109,
      "State": "California",
      "Phone": "[415] 6744388",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Martial Arts Academy (Doce Pares)",
      "Address": "120 Main Ave. Suite C., Sacramento ",
      "ZipCode": 95838,
      "State": "California",
      "Phone": "[916] 8038157",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Martial Arts Academy (Doce Pares)",
      "Address": "120 Main Ave. Suite C., Sacramento ",
      "ZipCode": 95838,
      "State": "California",
      "Phone": "[916] 8038157",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Martial Arts Academy",
      "Address": "3901 A Pell Circle, Sacramento ",
      "ZipCode": 95834,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Tactical Systems",
      "Address": "Mente Linda Loop Park, Milpitas ",
      "ZipCode": 95035,
      "State": "California",
      "Phone": "[909] 4388045",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "|FILKOMA (Filipino Kombat Martial Arts) ",
      "Address": "833 Brisbane St., Hemet ",
      "ZipCode": 92545,
      "State": "California",
      "Phone": "[858] 4515425",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Gajo Martial Arts",
      "Address": "10890B Thornmint Rd., San Diego ",
      "ZipCode": 92127,
      "State": "California",
      "Phone": "[805] 3768292",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Gonzalez Martial Arts Academy",
      "Address": "1143 W. Fremont St, Stockton ",
      "ZipCode": 95203,
      "State": "California",
      "Phone": "[209] 369 2747",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "ILMA/Sanano Arnis Trecehampas",
      "Address": "4681 Mission St., San Frnacisco ",
      "ZipCode": 94112,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "IMB Academy Inc.",
      "Address": "22109 South Vermont Ave., Torrance ",
      "ZipCode": 90502,
      "State": "California",
      "Phone": "[310] 7878793",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Inayan Eskrima Academy",
      "Address": "1350 South Park Victoria, Milpitas/San Jose ",
      "ZipCode": 95132,
      "State": "California",
      "Phone": "[408] 7124244",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Inayan Systems International",
      "Address": "PO Box 2112, Paradise, CA. ",
      "ZipCode": 95967,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "International Eskrima Serrada Association",
      "Address": "San Francisco, Oakland, Los Angeles ",
      "ZipCode": "",
      "State": "California",
      "Phone": "[888] 2215462",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Island Warriors Balintawak Arnis",
      "Address": "4380 Sonoma Blvd., Vallejo ",
      "ZipCode": 94589,
      "State": "California",
      "Phone": "[707] 4771159",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Jedokan Martial Arts",
      "Address": "9412 Irondale Ave., Chatsworth ",
      "ZipCode": 91311,
      "State": "California",
      "Phone": "[818] 6455240",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "JKD Self Defense Academy",
      "Address": "1931 Old Middlefield Way, Mountain View ",
      "ZipCode": 94043,
      "State": "California",
      "Phone": "[408] 3730204",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "KaJuKenBo Self Defense Institute of Vallejo",
      "Address": "974 Benicia Rd, Vallejo ",
      "ZipCode": 94591,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kali Method ",
      "Address": "1330 N. Monte Vista Ave #2 ",
      "ZipCode": 91786,
      "State": "California",
      "Phone": "[909] 5758809",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "KATA Tapado Filipino Long Stick Fighting",
      "Address": "Curtis Park, Sacramento ",
      "ZipCode": 95864,
      "State": "California",
      "Phone": "[916] 718 7639",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kenshin Kai",
      "Address": "6070 Livingston Ln., Placerville ",
      "ZipCode": 95667,
      "State": "California",
      "Phone": "[808] 5545445",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Lameco Eskrima",
      "Address": "",
      "ZipCode": "",
      "State": "California",
      "Phone": "[818] 3570440",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Latosa Weapons System (Latosa Escrima)",
      "Address": "PO Box 651, Windsor ",
      "ZipCode": 95492,
      "State": "California",
      "Phone": "[707] 8430640",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Liahona Warrior Arts International",
      "Address": "6100 Tremain Dr, Citrus Heights ",
      "ZipCode": 95621,
      "State": "California",
      "Phone": "[916] 7473694 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Los Angeles Doce Pares ",
      "Address": "Los Angeles ",
      "ZipCode": 90031,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Magda Institute of Martial Arts",
      "Address": "7255 Canby Ave., Reseda ",
      "ZipCode": 91335,
      "State": "California",
      "Phone": "[818] 3422455",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Manglinong Martial Arts",
      "Address": "PO Box 8251, South Lake Tahoe ",
      "ZipCode": 96158,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Martial Arts Training Club",
      "Address": "Sacramento ",
      "ZipCode": 95824,
      "State": "California",
      "Phone": "[916] 4219428",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Marin Self Defense Solutions",
      "Address": "555 Francisco Blvd E, Unit 12, San Rafael ",
      "ZipCode": 94901,
      "State": "California",
      "Phone": "[415] 7554318",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Mata sa Bagyo",
      "Address": "Stockton",
      "ZipCode": "",
      "State": "California",
      "Phone": "[209] 9920832",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Mikita School of Martial Art",
      "Address": "12908 West Washington Blvd., Los Angeles ",
      "ZipCode": 90066,
      "State": "California",
      "Phone": "[310] 7545517",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "MiraRada Escrima",
      "Address": "1163 East March Lane, Suite D363, Stockton ",
      "ZipCode": 95210,
      "State": "California",
      "Phone": "[209] 4053189",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Modern Arnis Remy Presas International Organization (MARPIO)",
      "Address": "1169 Market St. Suite 249, San Francisco ",
      "ZipCode": 94103,
      "State": "California",
      "Phone": "[415] 7030434",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Mt. Diablo Hwa Rang Kwan/Isidro Modern Arnis",
      "Address": "3105 Willow Pass Rd., Baypoint ",
      "ZipCode": 94565,
      "State": "California",
      "Phone": "[925] 4581254",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Nor Cal Kabaroan (W.O.R. Ministries)",
      "Address": "4383 Oxwood Dr., Sacramento ",
      "ZipCode": 95826,
      "State": "California",
      "Phone": "[916] 8027096",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Oakland Eskrima Club",
      "Address": "4770 San Pablo Ave., Emeryville ",
      "ZipCode": 94608,
      "State": "California",
      "Phone": "[510] 3938928",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Ohana Kenpo Karate & Bandalan Doce Pares (Bandalan Doce Pares Headquarters)",
      "Address": "402 3rd St., San Juan Bautista ",
      "ZipCode": 95045,
      "State": "California",
      "Phone": "[408] 3100101",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Original Giron Escrima Federation",
      "Address": "Vallejo ",
      "ZipCode": 94591,
      "State": "California",
      "Phone": "[707] 8532477",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Pakamut Flex Services Inc.",
      "Address": "PO Box 65552, Los Angeles ",
      "ZipCode": 90065,
      "State": "California",
      "Phone": "[323] 3508500",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pakamut Eagle Rock Los Angeles",
      "Address": "1840 Yosemite Dr, Los Angeles",
      "ZipCode": 90041,
      "State": "California",
      "Phone": " ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "P.A.M.A.",
      "Address": "P.O. Box 610277, San Jose ",
      "ZipCode": 95161,
      "State": "California",
      "Phone": "[408] 9463200",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pekiti Tirsia Kali",
      "Address": "2295 Lincoln Ave, San Jose ",
      "ZipCode": 95125,
      "State": "California",
      "Phone": "[949] 922 � 5583",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": " 729 Matoza Ln.",
      "Address": "San Leandro ",
      "ZipCode": 94577,
      "State": "California",
      "Phone": " [510] 2067156",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Phelan Self Defense",
      "Address": "4647 Jackson Ln, Phelan ",
      "ZipCode": 93372,
      "State": "California",
      "Phone": "[760] 8690840",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "PMAA (Hayward Martial Arts)",
      "Address": "1024 B St. Suite 1, Hayward ",
      "ZipCode": 94541,
      "State": "California",
      "Phone": "[925] 8647477",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "PTKSMF Los Angeles",
      "Address": "Los Angeles",
      "ZipCode": "",
      "State": "California",
      "Phone": "[323] 4128556",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "PTKSMF Peninsula",
      "Address": "230 De Anza Blvd., San Mateo ",
      "ZipCode": 94402,
      "State": "California",
      "Phone": "[415] 9396346",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pulahan Derobio Eskrima",
      "Address": "821 Kuhn Drive, Suite 106, Chula Vista ",
      "ZipCode": 91914,
      "State": "California",
      "Phone": "[619] 8851571",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "San Diego Doce Pares",
      "Address": "San Diego",
      "ZipCode": "",
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Senkotiros",
      "Address": "13752 Doolittle Drive, San Leandro ",
      "ZipCode": 94578,
      "State": "California",
      "Phone": "[510] 4836560",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "",
      "Address": "3385 Deer Valley Rd. Antioch ",
      "ZipCode": 94509,
      "State": "California",
      "Phone": "[925] 7531167",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "",
      "Address": "628 4th Street, Davis ",
      "ZipCode": 95616,
      "State": "California",
      "Phone": "[530] 7585431",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "",
      "Address": "31600 Alvarado Blvd., Union City ",
      "ZipCode": 94587,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Serrada Escrima ",
      "Address": "P.O. Box 268, French Camp ",
      "ZipCode": 95231,
      "State": "California",
      "Phone": "[209] 2342188",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "SikaranArnis Academy",
      "Address": "Sikaran Bldg. 1122 High St., Delano ",
      "ZipCode": 93215,
      "State": "California",
      "Phone": "[661] 7209175",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Solve et Coagula",
      "Address": "13428 Maxella Ave # 192, Marina Del Rey ",
      "ZipCode": 90292,
      "State": "California",
      "Phone": "[310] 9029673",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "South Bay Filipino",
      "Address": "19751 South Figuroa Ave., Carson ",
      "ZipCode": 90745,
      "State": "California",
      "Phone": "[310] 9611266",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Spirit of Filipino Martial Arts",
      "Address": "833 Brisbane St., Hemet ",
      "ZipCode": 92545,
      "State": "California",
      "Phone": "[909] 4388045",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Sudlud Eskrima",
      "Address": "San Jose ",
      "ZipCode": 95117,
      "State": "California",
      "Phone": "[408] 8665127",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Tae Kali Do",
      "Address": "1661 Pacific Ave. #18, Oxnard ",
      "ZipCode": 93033,
      "State": "California",
      "Phone": "[805] 2562032",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Toma's Modern Arnis",
      "Address": "4404 West Victory Blvd., Burbank ",
      "ZipCode": 91505,
      "State": "California",
      "Phone": "[818] 8434984",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Trampilla Arnis",
      "Address": "1551 W. 13th St. Upland",
      "ZipCode": "",
      "State": "California",
      "Phone": "[909] 2648136",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Typhoon Martial Arts",
      "Address": "4120 Franklin Blvd, Sacramento ",
      "ZipCode": 95820,
      "State": "California",
      "Phone": "[916] 4555155",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Upakan BaraBara Martial Arts Academy",
      "Address": "Fremont, ",
      "ZipCode": 94536,
      "State": "California",
      "Phone": "[510] 8285108",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Urban Defense Tactics",
      "Address": "San Jose, San Jose ",
      "ZipCode": 95148,
      "State": "California",
      "Phone": "[408] 7537539",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Wan Chuan Do Kali Association",
      "Address": "PO Box 1293, Magalia ",
      "ZipCode": 95954,
      "State": "California",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Warriors of Visayas Ordiniza Filipino Martial Arts",
      "Address": "2910 Southside Rd., Hollister ",
      "ZipCode": 95023,
      "State": "California",
      "Phone": "[831] 524295",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Waterford Martial Arts Center",
      "Address": "304 F St. Suite C., Waterford ",
      "ZipCode": 95386,
      "State": "California",
      "Phone": "[209] 4092462",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "White Tiger Martial Arts Academy",
      "Address": "9525 N. Sommerville Dr. #111, Fresno ",
      "ZipCode": 93720,
      "State": "California",
      "Phone": "[559] 4331200",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Williams Home of Escrima",
      "Address": "Tracy ",
      "ZipCode": 95304,
      "State": "California",
      "Phone": "[209] 8352546",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "World Eskrido Federation",
      "Address": "5917 Los Molinos Dr., Buena Park ",
      "ZipCode": 90620,
      "State": "California",
      "Phone": "[714] 9283371",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Colorado Bahad Zu'bu Eskrima/Kali/Arnis",
      "Address": "14401 E.Bayaud Ave Unit E., Aurora",
      "ZipCode": 80011,
      "State": "Colorado",
      "Phone": "[303] 5478665",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima / Kali / Arnis"
    },
    {
      "Name": "Colorado Chinese & Filipino Martial Arts",
      "Address": "21235 E. Grand Dr., Centennial ",
      "ZipCode": 80015,
      "State": "Colorado",
      "Phone": "[303] 2047008",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Defense Institute School of SelfDefense",
      "Address": "845 South Circle Dr., Colorado Springs ",
      "ZipCode": 80910,
      "State": "Colorado",
      "Phone": "[719] 6308373",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Denver Academy of Martial Arts",
      "Address": "4401 S. Tamarac Pkwy, Denver ",
      "ZipCode": 80247,
      "State": "Colorado",
      "Phone": "[303] 7589383 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kapatiran Mandirigma Colorado ",
      "Address": "4103 S. Mason, Ft. Collins ",
      "ZipCode": 80525,
      "State": "Colorado",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Martial works",
      "Address": "Boulder ",
      "ZipCode": 80304,
      "State": "Colorado",
      "Phone": "[720] 933 6011",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Nubreed Kali Silat",
      "Address": "935 Sheridan Blvd. #34, Lakewood ",
      "ZipCode": 80214,
      "State": "Colorado",
      "Phone": "[720] 6286803",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Rocky Mountain Kali Group",
      "Address": "Colorado Springs ",
      "ZipCode": 80903,
      "State": "Colorado",
      "Phone": "[719] 3046764",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tabimina Balintawak Denver/Central US Chapter",
      "Address": " Central Park, Stapleton,Denver ",
      "ZipCode": 80238,
      "State": "Colorado",
      "Phone": "[850] 6355334",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Becker Wing Chun Kune Tao (Kali Silat Sina Tirsia Wali)",
      "Address": " 346 Main St.,Danbury ",
      "ZipCode": 6810,
      "State": "Connecticut",
      "Phone": "[203] 7912116",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": " 346 Main St.Danbury 06810",
      "Address": "",
      "ZipCode": "",
      "State": "",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "",
      "Style": ""
    },
    {
      "Name": "Connecticut Modern Arnis Jujitsu",
      "Address": "871F Newfield St., Middletown ",
      "ZipCode": 6457,
      "State": "Connecticut",
      "Phone": "[860] 6328188",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Cromwell Martial Arts",
      "Address": "871F Newfield St., Middletown ",
      "ZipCode": 6457,
      "State": "Connecticut",
      "Phone": "[860] 6328188",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Lion Survival Defense System",
      "Address": "194 Bridgeport Ave., Milford ",
      "ZipCode": 6460,
      "State": "Connecticut",
      "Phone": "[203] 5573312",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Practical Self Defense Training Center",
      "Address": "2148 South Main St., Waterbury ",
      "ZipCode": 5706,
      "State": "Connecticut",
      "Phone": "[203] 5969073",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Stamford Center for Martial Arts",
      "Address": "100 Research Dr., Stamford ",
      "ZipCode": 6906,
      "State": "Connecticut",
      "Phone": "[203] 5709040",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Swift Waters MMA",
      "Address": "25 Meadow St., Willimantic ",
      "ZipCode": 6226,
      "State": "Connecticut",
      "Phone": "[860] 3197238",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Dauntless Practical Martial Arts",
      "Address": "250 Stadium Street, Suite 100, Smyrna 19977644 Plaza Drive, Newark ",
      "ZipCode": 19702,
      "State": "Delaware",
      "Phone": "[302] 7433115",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Sachetti's Martial Arts",
      "Address": " Four Seasons Plaza, Rt. 896, Newark 19702",
      "ZipCode": "",
      "State": "Delaware",
      "Phone": "[302] 2243057",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Arnis Karate",
      "Address": "1479 Belcher Rd. S, Largo, Florida",
      "ZipCode": "",
      "State": "Florida",
      "Phone": "[727] 5353574",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Authentic Jeet Kune Do Academy",
      "Address": "6635 M.L.K. st. N., Saint Petersburg ",
      "ZipCode": 33702,
      "State": "Florida",
      "Phone": "[727] 5772108",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Central Florida Martial Art Academy",
      "Address": "8319 SW 61st Place, Gainesville ",
      "ZipCode": 32608,
      "State": "Florida",
      "Phone": "[352] 3288526",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Cross Martial Arts Training",
      "Address": "12780 51st Court North, West Palm Beach ",
      "ZipCode": 33411,
      "State": "Florida",
      "Phone": "[561] 5129707",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "CSSD Conceptual Tactical Arnis Presas Arnis",
      "Address": "3665 East Bay Dr. Suite 204233, Largo ",
      "ZipCode": 33771,
      "State": "Florida",
      "Phone": "[727] 3190550",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "East Coast School of Self Defense",
      "Address": "21000 Boca Rio Rd., A20, Boca Raton ",
      "ZipCode": 33433,
      "State": "Florida",
      "Phone": "[561] 2185755",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipine Triad Arts Synthesis",
      "Address": "2129 N.E. 4th Ave., Cape Coral ",
      "ZipCode": 33909,
      "State": "Florida",
      "Phone": "[239] 6991993",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Combat Systems Headquarters",
      "Address": "812 N. Howard Ave., Tampa ",
      "ZipCode": 33606,
      "State": "Florida",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Orlando",
      "Address": "4609 W. Ponkan Rd., Apopka ",
      "ZipCode": 32712,
      "State": "Florida",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tampa 33606",
      "Address": "",
      "ZipCode": "",
      "State": "Florida",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Kali Academy",
      "Address": "7352 West Atlantic Blvd., Margate ",
      "ZipCode": 33063,
      "State": "Florida",
      "Phone": "[954] 9730222",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Filipino Kali Academy",
      "Address": "2293 NE 164th St. North Miami Beach ",
      "ZipCode": 33160,
      "State": "Florida",
      "Phone": "[305] 9441114",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Garimot Arnis Training (G.A.T )",
      "Address": "852 Saxon Blvd Suite 30, Orange City",
      "ZipCode": "",
      "State": "Florida",
      "Phone": "[352] 3018229",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Haastyle Martial Arts Academy",
      "Address": "21000 Boca Rio Rd. Suite A20, Boca Raton ",
      "ZipCode": 33433,
      "State": "Florida",
      "Phone": "[561] 2185755",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Hybrid Martial Arts Academy",
      "Address": "12105 SW 129th Court #103, Miami .",
      "ZipCode": 33186,
      "State": "Florida",
      "Phone": "[786] 3856424",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kombat Arts Institute ",
      "Address": "133 Flagship Dr., Lutz ",
      "ZipCode": 33549,
      "State": "Florida",
      "Phone": "[813] 2791940",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Luzviminda Arnis Kali Brotherhood",
      "Address": "5949 Caroline Dr., Wesley Chapel ",
      "ZipCode": 33544,
      "State": "Florida",
      "Phone": "[813] 9731620",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis / Kali"
    },
    {
      "Name": "Miami STICKFIGHTER Club",
      "Address": "Varied Public Parks, Cutler Bay and Homestead (SW MiamiDade)",
      "ZipCode": "",
      "State": "Florida",
      "Phone": " ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Majapai Derobio Arnis 63 Generals",
      "Address": "1897 Island Walk Way, Fernandina Beach ",
      "ZipCode": 32034,
      "State": "Florida",
      "Phone": "[904] 4151733",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Miami Arnis Group",
      "Address": "909 Alton Rd., Miami Beach ",
      "ZipCode": 33139,
      "State": "Florida",
      "Phone": "[305] 3010294",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Orlando Balintawak Club",
      "Address": "317 E Washington St Unit D., Minneola ",
      "ZipCode": 34715,
      "State": "Florida",
      "Phone": "[850] 3251111",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "P. A. E. T. E. (Garimot System USA)",
      "Address": "1240 NW 92 Ave., Pembroke Pines ",
      "ZipCode": 33024,
      "State": "Florida",
      "Phone": "[954] 4324433",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pambuan Arnis of Sarasota",
      "Address": "2203 Pinehurst St., Sarasota ",
      "ZipCode": 34231,
      "State": "Florida",
      "Phone": "[941] 7806013",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Philippine Martial Art Society",
      "Address": "Box 210642, Royal Palm Beach ",
      "ZipCode": 33421,
      "State": "Florida",
      "Phone": "[561] 6979162",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Shin Wellness",
      "Address": "4500 Biscayne Blvd., Suite 202, Miami ",
      "ZipCode": 33137,
      "State": "Florida",
      "Phone": "[305] 5719090",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Smileys Combat Athletix",
      "Address": "3600 Peoria Road #202/203, Orange Park ",
      "ZipCode": 32065,
      "State": "Florida",
      "Phone": "[904] 6447571",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tabimina Balintawak",
      "Address": "South East, Santa Rosa Beach ",
      "ZipCode": 32459,
      "State": "Florida",
      "Phone": "[850] 6355334",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tampa Kali",
      "Address": "5705 N. Nebraska Ave., Tampa and St. Petersburg ",
      "ZipCode": 33604,
      "State": "Florida",
      "Phone": "[813] 4548743",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Traditional Martial Arts",
      "Address": "2220 Hempel Ave., Gotha ",
      "ZipCode": 34734,
      "State": "Florida",
      "Phone": "[407] 2908049",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Unified Martial Art Academy",
      "Address": "12580 SW 88th St., Miami ",
      "ZipCode": 33186,
      "State": "Florida",
      "Phone": "[305] 5952892",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Warrior Arts Academy",
      "Address": "11764 Marco Beach Drive # 2, Jacksonville ",
      "ZipCode": 32224,
      "State": "Florida",
      "Phone": "[904] 6457000",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "World Kali Silat Society",
      "Address": "3950 Ironwood Cr., Bradenton ",
      "ZipCode": 34209,
      "State": "Florida",
      "Phone": "[917] 5355254",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Yaro's Arnis Karate",
      "Address": "1240 S.Highland Ave., Clearwater ",
      "ZipCode": 33756,
      "State": "Florida",
      "Phone": "[727] 6413843",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "AKJ Karate",
      "Address": "3565 GA HWY 20 South, Suite B, Conyers ",
      "ZipCode": 30013,
      "State": "Georgia",
      "Phone": "[770] 8609304",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "American Karate Productions",
      "Address": "2241 Idlewood Road, Tucker ",
      "ZipCode": 30084,
      "State": "Georgia",
      "Phone": "[770] 4938970",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Atlanta Filipino Martial Arts",
      "Address": "1284 West Spring Street, Smyrna ",
      "ZipCode": 30080,
      "State": "Georgia",
      "Phone": "[770] 3198662",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Atlanta Martial Arts Club",
      "Address": "Roswell ",
      "ZipCode": 30076,
      "State": "Georgia",
      "Phone": "[770] 873 2234",
      "Email": "",
      "Web URL": "",
      "Type": "club",
      "Style": ""
    },
    {
      "Name": "Battlefield Kali",
      "Address": "4348 Waialae Avenue # 128, Honolulu ",
      "ZipCode": 96816,
      "State": "Georgia",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Fayette Academy of Martial Arts",
      "Address": "931 Glynn St., Fayetteville ",
      "ZipCode": 30214,
      "State": "Georgia",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Battlefield Kali",
      "Address": "4348 Waialae Avenue # 128, Honolulu ",
      "ZipCode": 96816,
      "State": "Hawaii",
      "Phone": "[808] 8641620",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Bandalan Doce Pares",
      "Address": "Honolulu",
      "ZipCode": "",
      "State": "Hawaii",
      "Phone": "[808] 8641620 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Delmar School Fil/Mar/Arts",
      "Address": "87126 Kulahanai PL., Waianae ",
      "ZipCode": 96792,
      "State": "Hawaii",
      "Phone": "[808] 2242551",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Fonseca KenpoJujitsu",
      "Address": "911081 Kahalepouli St., Kapolei ",
      "ZipCode": 96707,
      "State": "Hawaii",
      "Phone": "[808] 7232792",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "General Ablen's School of Derobio Escrima",
      "Address": "1519 Kalaepa'a Dr., Honolulu ",
      "ZipCode": 96817,
      "State": "Hawaii",
      "Phone": "[808] 6209056",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Integrated Training Concepts",
      "Address": "P.O. Box 12104, Lahaina ",
      "ZipCode": 96761,
      "State": "Hawaii",
      "Phone": "[808] 7813302",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Ola'aNalo Eskrima",
      "Address": "Old Stadium Park, Honolulu",
      "ZipCode": "",
      "State": "Hawaii",
      "Phone": "[808] 2645212",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Pacific Eskrima Academy (Tacosa Cadena Eskrima)",
      "Address": "P.O. Box 2212 Kea'au, Hilo ",
      "ZipCode": 96749,
      "State": "Hawaii",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Pedoy's School of Escrima",
      "Address": "94529 Uke`e St. #103, Waipahu ",
      "ZipCode": 96797,
      "State": "Hawaii",
      "Phone": "[209] 3213586",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Molokai Martial Arts",
      "Address": "PO Box 1715, Kaunakakai ",
      "ZipCode": 96748,
      "State": "Hawaii",
      "Phone": "[808] 2163211",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "The Fighting Edge",
      "Address": "Honolulu ",
      "ZipCode": 96818,
      "State": "Hawaii",
      "Phone": "[808] 3360936",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Idaho Heartland School of Eskrima & Self Defense",
      "Address": "31149 N. Hayden Dr., Spirit Lake ",
      "ZipCode": "",
      "State": "Idaho",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Amalgam Martial Academy",
      "Address": "456 W. 75th St., Downers Grove ",
      "ZipCode": 60516,
      "State": "Illinois",
      "Phone": "[331] 7775236",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Balanced Dynamics Academy",
      "Address": "1300 East B St., #2, Belleville ",
      "ZipCode": 62221,
      "State": "Illinois",
      "Phone": "[618] 5308761",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Bandalan Doce Pares",
      "Address": " 331 Tiverton Lane, Steger ",
      "ZipCode": 60475,
      "State": "Illinois",
      "Phone": "[708] 7567240",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "DBFMA Modern Arnis",
      "Address": "605 E. Ogden Ave., Naperville ",
      "ZipCode": 60563,
      "State": "Illinois",
      "Phone": "[630] 4478286",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Defensive Combat Initiatives",
      "Address": "PO Box 29, Millstadt ",
      "ZipCode": 62260,
      "State": "Illinois",
      "Phone": "[618] 9793558",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Defensor Method Elgin",
      "Address": "1080 E, Chicago St., Elgin ",
      "ZipCode": 60120,
      "State": "Illinois",
      "Phone": "[847] 8737907",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Eagle & Dragon Martial Arts Academy",
      "Address": "2331a Old Collinsville Rd., Belleville ",
      "ZipCode": 62221,
      "State": "Illinois",
      "Phone": "[618] 2222888",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Elite Martial Arts & Fitness",
      "Address": " 4001 Golf Rd., Skokie ",
      "ZipCode": 60076,
      "State": "Illinois",
      "Phone": "[847] 3290291",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Extreme Kung Fu/Wu Shu Training Center",
      "Address": "6525 N. Clark St., Chicago ",
      "ZipCode": "",
      "State": "Illinois",
      "Phone": "[773] 7196488",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Kali / Eskrima Academy of Chicago",
      "Address": "4357 N. Lincoln Ave., Chicago ",
      "ZipCode": 60618,
      "State": "Illinois",
      "Phone": "[847] 2393990",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali / Eskrima"
    },
    {
      "Name": "JKDConcepts/Kali/Silat of Bloomington",
      "Address": "602 S Main St, Bloomington ",
      "ZipCode": 61701,
      "State": "Illinois",
      "Phone": "[309] 3107626",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Kali Combat Academy",
      "Address": " Chicago ",
      "ZipCode": 60088,
      "State": "Illinois",
      "Phone": "[847] 9897847",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kennedy's Martial Arts Academy",
      "Address": "1199 Biesterfield Road, Elk Grove Village ",
      "ZipCode": 60007,
      "State": "Illinois",
      "Phone": "[847] 8918731",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Midway Kodenkan",
      "Address": "5159 Archer Ave., Chicago ",
      "ZipCode": 60632,
      "State": "Illinois",
      "Phone": "[773] 2848818",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "RFA Martial Academy",
      "Address": "1212 Capitol Dr., Addison ",
      "ZipCode": 60101,
      "State": "Illinois",
      "Phone": "[224] 6596984",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Temujin 2 (Lucaylucay Kali/JKD Association)",
      "Address": "611 N Orchard, West Frankfort ",
      "ZipCode": 62896,
      "State": "Illinois",
      "Phone": "[618] 8890647",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "World Martial Arts Academy USA",
      "Address": "316 Anderson Blvd., Geneva ",
      "ZipCode": 60134,
      "State": "Illinois",
      "Phone": "[630] 4020033",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Xtreme Training Academy",
      "Address": "1292 Humbracht Circle Unit E.. Bartlett ",
      "ZipCode": 60103,
      "State": "Illinois",
      "Phone": "[630] 7800054",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Indy Arnis Club",
      "Address": "7141 Southeastern Ave., Indianapolis ",
      "ZipCode": 46239,
      "State": "Indiana",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Midwest Martial Arts Group",
      "Address": "3104 Eads St., Davenport ",
      "ZipCode": 52802,
      "State": "Iowa",
      "Phone": "[563] 4997561",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Academy of Martial Arts",
      "Address": "401 N. Madison St., Spring Hill ",
      "ZipCode": 66083,
      "State": "Kansas",
      "Phone": "[913] 6081515",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Malay Fighting Arts Academy",
      "Address": "856 East 167th Court, Gardner ",
      "ZipCode": 66030,
      "State": "Kansas",
      "Phone": "[913] 6264372",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "AFS Academy of Martial Arts",
      "Address": " 427 Big Hill Ave., Richmond ",
      "ZipCode": 40475,
      "State": "Kentucky",
      "Phone": "[859] 6238023",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Roninkan",
      "Address": "Highgrove ",
      "ZipCode": 40013,
      "State": "Kentucky",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tactical Combative Kali",
      "Address": "",
      "ZipCode": 40475,
      "State": "Kentucky",
      "Phone": "[859] 6262476",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "USA Philippine Jendo Association",
      "Address": " 702 Hickory Ridge Circle, Hopkinsville ",
      "ZipCode": 42240,
      "State": "Kentucky",
      "Phone": "[270] 3051869",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Progressive Martial Arts Training Center",
      "Address": "910 E. Main St., Suite 31, New Iberia ",
      "ZipCode": 70560,
      "State": "Louisiana",
      "Phone": "[337] 2011791",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Element of Surprise FMA",
      "Address": "22 Alvin Dr., Pineville ",
      "ZipCode": 71360,
      "State": "Louisiana",
      "Phone": "[318] 7304636",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Apolo's Karate (Pekiti Tirisa Kali System)",
      "Address": "750 Maryland Route 3South, Gambrills ",
      "ZipCode": 21054,
      "State": "Maryland",
      "Phone": "[410] 9235222",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Black Tiger Martial Arts Academy",
      "Address": "6901 Security Blvd. # 2038, Windsor Mill ",
      "ZipCode": 21244,
      "State": "Maryland",
      "Phone": "[443] 5403672",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "DC Kali",
      "Address": "916 G Street, NW., Washington",
      "ZipCode": "",
      "State": "Maryland",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Gentle East Martial Arts",
      "Address": "8749 Flower Ave, Takoma , Silver Spring ",
      "ZipCode": 20910,
      "State": "Maryland",
      "Phone": "(301) 7688401",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Hebb Institute of Martial Arts",
      "Address": "Park Rd., Williamsport ",
      "ZipCode": 21795,
      "State": "Maryland",
      "Phone": "[301] 2237719",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pekiti Tirsia Kali DC/MD/VA",
      "Address": "Benfield Sportscenter, 1031 Benfield Blvd., Millersville ",
      "ZipCode": 21108,
      "State": "Maryland",
      "Phone": "[443] 3029613",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pinakatay Arnis Sigidas",
      "Address": "949 Bonifant Ave., Silver Spring ",
      "ZipCode": 20910,
      "State": "Maryland",
      "Phone": "[301] 7688401",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "School Of Ahati",
      "Address": "11225 Oak Leaf Dr., Silver Spring ",
      "ZipCode": 20901,
      "State": "Maryland",
      "Phone": "[301] 5370028",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "World Nickelstick Balintawak Escrima Maryland",
      "Address": " Towson ",
      "ZipCode": 21286,
      "State": "Maryland",
      "Phone": "[443] 7630420",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "YawYan Fervilleon Martial Arts US HQ",
      "Address": "601 Dover Rd, Suite 12, Rockville ",
      "ZipCode": 20850,
      "State": "Maryland",
      "Phone": "[855] 8929926",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "AndersonKali",
      "Address": "44 South St. (American Legion, Post217), Plainville ",
      "ZipCode": 2762,
      "State": "Massachusetts",
      "Phone": "[508] 8380057",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Boston Arnis Club",
      "Address": "Boston ",
      "ZipCode": "",
      "State": "Massachusetts",
      "Phone": "[603] 5293564",
      "Email": "",
      "Web URL": "",
      "Type": "Club",
      "Style": "Arnis"
    },
    {
      "Name": "Methuen",
      "Address": "",
      "ZipCode": 1844,
      "State": "Massachusetts",
      "Phone": "[978] 7716653",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Catanese Kajukenbo ETS method",
      "Address": "950 East Falmouth Highway, Falmouth ",
      "ZipCode": 2563,
      "State": "Massachusetts",
      "Phone": "[617] 7022220 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "CSE Boston (Combat Serrada Escrima) ",
      "Address": "600 Columbia Rd., #26, Dorchester ",
      "ZipCode": 2125,
      "State": "Massachusetts",
      "Phone": "[617] 8690516",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Dragon Within Martial Arts",
      "Address": "26 Howley St., Peabody ",
      "ZipCode": 1970,
      "State": "Massachusetts",
      "Phone": "[978] 5318511",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Jou Fang Chuan Nine Anle Fist",
      "Address": "50 North Beacon St., Boston ",
      "ZipCode": 2134,
      "State": "Massachusetts",
      "Phone": "[617] 6809981 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Martial Arts Research Institute",
      "Address": "53 Mason St. Suite 201, Salem ",
      "ZipCode": 1970,
      "State": "Massachusetts",
      "Phone": "[978] 7770586",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pence Self Defense",
      "Address": "226 Cambridge St., Burlington ",
      "ZipCode": 1803,
      "State": "Massachusetts",
      "Phone": "[877] 527 2838",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Phoenix Martial Arts of Massachusetts",
      "Address": "54 Sumner St., Milford ",
      "ZipCode": 1757,
      "State": "Massachusetts",
      "Phone": "[516] 3534923",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "SEAFA",
      "Address": " 375 Foundry St., Easton",
      "ZipCode": "",
      "State": "Massachusetts",
      "Phone": "[508] 8898414",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Universal Grapping Arts",
      "Address": "Malden ",
      "ZipCode": 2148,
      "State": "Massachusetts",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "White Leopard Sikaran",
      "Address": "540 Main St., Athol ",
      "ZipCode": 1331,
      "State": "Massachusetts",
      "Phone": "[978] 2496328",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Attributive Martial Arts Inc.",
      "Address": "697 Princess Dr., Canton ",
      "ZipCode": 48188,
      "State": "Michigan",
      "Phone": "[734] 9811774",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Instinctive Response Training",
      "Address": "200 West Center, Alma ",
      "ZipCode": 48801,
      "State": "Michigan",
      "Phone": "[989] 5608004",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "King Tiger Martial Arts School (Sina Tirsia Wali Kali/Silat)",
      "Address": " Detroit ",
      "ZipCode": 48030,
      "State": "Michigan",
      "Phone": "[248] 5445657",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "K.S.K. Martial Arts",
      "Address": "3712 Homewood, Lansing ",
      "ZipCode": 48910,
      "State": "Michigan",
      "Phone": "[517] 8539856",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Martial Arts Unlimited",
      "Address": "1060 West 14 Mile , Clawson, MI ",
      "ZipCode": 48017,
      "State": "Michigan",
      "Phone": "[248] 4354030",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Masters and Champions (Concepts in Motion)",
      "Address": "6072 S. Saginaw St., Grand Blanc ",
      "ZipCode": 48439,
      "State": "Michigan",
      "Phone": "[810] 3483421",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Michigan Pekiti Tirsia Pitbulls",
      "Address": "Detroit",
      "ZipCode": "",
      "State": "Michigan",
      "Phone": "[248] 9817495",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Michigan Modern Arnis (A MARPPIO School)",
      "Address": "11860 Wheaton Dr., Sterling Heights ",
      "ZipCode": 48313,
      "State": "Michigan",
      "Phone": "[586] 7390497",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Progressive Kali Silat",
      "Address": "315 Larry Ln., Charlotte ",
      "ZipCode": 48813,
      "State": "Michigan",
      "Phone": "[517] 5412864",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Pukulan Power Self Defense",
      "Address": "3330 W. Water St, Port Huron ",
      "ZipCode": 48060,
      "State": "Michigan",
      "Phone": "[810] 8410682",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Zen Modern Arnis",
      "Address": "Warren ",
      "ZipCode": 48091,
      "State": "Michigan",
      "Phone": "[586] 4848407",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Bahad Zubu Midwest Chapter",
      "Address": "2913 Lyndale Ave. S., Minneapolis ",
      "ZipCode": 55408,
      "State": "Minnesota",
      "Phone": "[612] 5677727",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Innovative Fighting Arts",
      "Address": " 87212 Oak Lake Rd South, Kerrick ",
      "ZipCode": 55756,
      "State": "Minnesota",
      "Phone": "[218] 4965890",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Minneapolis Kali Group",
      "Address": "532 Chicago Ave. S., Minneapolis ",
      "ZipCode": 55407,
      "State": "Minnesota",
      "Phone": "[612] 8216800",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Minnesota Martial Arts Academy",
      "Address": "1916 57th Avenue North, Brooklyn Center ",
      "ZipCode": 55430,
      "State": "Minnesota",
      "Phone": "[763] 5605696",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Philippine Combat Arts",
      "Address": "4930 MN169, New Hope ",
      "ZipCode": 55428,
      "State": "Minnesota",
      "Phone": "[612] 3274002",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Warrior's Cove",
      "Address": "3004 Texas Ave., Saint Louis Park ",
      "ZipCode": 55426,
      "State": "Minnesota",
      "Phone": "[612] 9788959",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Backyard Brotherhood Una Sa Laban",
      "Address": "4044 state route DD, Willow Springs ",
      "ZipCode": 65793,
      "State": "Missouri",
      "Phone": "[417] 2523441",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Combat Zone ",
      "Address": "2331 N. Pierce, Springfield ",
      "ZipCode": 65803,
      "State": "Missouri",
      "Phone": "[417] 8316840",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Dexter's Martial Arts Training Center",
      "Address": " 1310 Grand Ave., Columbia ",
      "ZipCode": 65203,
      "State": "Missouri",
      "Phone": "[573] 6900041",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Garimot Arnis Saint Louis ",
      "Address": "Willmore Park, Hampton and Jamieson Ave., St. Louis ",
      "ZipCode": 63109,
      "State": "Missouri",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Saint Louis Counterpoint Martial Arts",
      "Address": "1072 Wolfrum Rd., St Charles ",
      "ZipCode": 63304,
      "State": "Missouri",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Billings Chi Tu Do",
      "Address": "1807 Grand Ave., Billings ",
      "ZipCode": 59102,
      "State": "Montana",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "7th Direction School of Martial Arts / Treceham",
      "Address": "Box 216, Macy ",
      "ZipCode": 68039,
      "State": "Nevada",
      "Phone": "[402] 8465554",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "CKI Jeet Kune Do & Filipino Combat Escrima International",
      "Address": "730 W. Sunset Blvd., Las Vegas",
      "ZipCode": "",
      "State": "Nevada",
      "Phone": "[702] 2343189",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Filipino Mixed Martial Arts",
      "Address": "4331 W. Charleston Blvd, Las Vegas ",
      "ZipCode": 89131,
      "State": "Nevada",
      "Phone": "[702] 8718883",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Integrating Kali Combative Concepts (IKCC)",
      "Address": "Carson River Dr., Dayton ",
      "ZipCode": 89403,
      "State": "Nevada",
      "Phone": "[419] 9134522",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Las Vegas Kung Fu Academy",
      "Address": "11165 S. Eastern Ave. Ste. 110, Henderson ",
      "ZipCode": 89052,
      "State": "Nevada",
      "Phone": "[702] 3361095",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tribal Advantage Systems International",
      "Address": "3155 W. Post Rd., Las Vegas 89118",
      "ZipCode": "",
      "State": "Nevada",
      "Phone": "[702] 7853111",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Boston Arnis Club",
      "Address": "PO Box 171, Weare ",
      "ZipCode": 3281,
      "State": "New Hampshire",
      "Phone": "[603] 7593163",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Bujinkan Dojo",
      "Address": "Manchester ",
      "ZipCode": 3101,
      "State": "New Hampshire",
      "Phone": "[603] 6683181",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Green Mountain Martial Arts (Latosa Escrima Dai Si Hing Dan Palow)",
      "Address": "PO Box 806, Hanover",
      "ZipCode": "",
      "State": "New Hampshire",
      "Phone": "[802] 3339104",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Guy Chase Academy",
      "Address": "1660 Greenland Rd., Greenland ",
      "ZipCode": 3060,
      "State": "New Hampshire",
      "Phone": "[978] 8538513",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "SEAFA",
      "Address": "11 Tallwood Dr., Bow ",
      "ZipCode": 3303,
      "State": "New Hampshire",
      "Phone": "[603] 4960504",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Terry Dow's Academy of Martial Arts",
      "Address": "18 South Commercial St., Manchester ",
      "ZipCode": 3101,
      "State": "New Hampshire",
      "Phone": "[603] 5916546",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Alex Wilkie's Martial Arts Academy",
      "Address": "783 E. Main St., Bldg. 30E, Bridgewater ",
      "ZipCode": 8807,
      "State": "New Jersey",
      "Phone": "[732] 7481580",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Amara Arkanis Filipino Martial Arts Education",
      "Address": "#5 Scott St., Riverside ",
      "ZipCode": 8075,
      "State": "New Jersey",
      "Phone": "[609] 4563589",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "American Karate and Arnis Academy",
      "Address": "1703A Industrial Hwy., Cinnaminson ",
      "ZipCode": 8077,
      "State": "New Jersey",
      "Phone": "[856] 8294800",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Atienza Kali",
      "Address": "Belleville",
      "ZipCode": "",
      "State": "New Jersey",
      "Phone": "[201] 4635151",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Piscataway",
      "Address": "",
      "ZipCode": 8854,
      "State": "New Jersey",
      "Phone": "[201] 8928015",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Institute of Defensive Methods",
      "Address": "451 1st St., Hoboken ",
      "ZipCode": 7030,
      "State": "New Jersey",
      "Phone": "[201] 6830104",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kuntaw Kali Kruzada",
      "Address": "65 Chestnut St., Red Bank ",
      "ZipCode": 7701,
      "State": "New Jersey",
      "Phone": "[201] 6746609",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "97 Main St.",
      "Address": "97 Main St., Woodbridge ",
      "ZipCode": 7095,
      "State": "New Jersey",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Modern Fighting Concepts Academy",
      "Address": "307 White Horse Pike, Absecon ",
      "ZipCode": 8201,
      "State": "New Jersey",
      "Phone": "[609] 6462113",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pami Kol Street Survival Self Defense",
      "Address": "2234 West Bangs Avenue, Neptune ",
      "ZipCode": 7753,
      "State": "New Jersey",
      "Phone": "[848] 2182646",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "PIMA Academy",
      "Address": "779 Bergen Avenue (Rm 111, 2nd Fl.) , Jersey City ",
      "ZipCode": 7306,
      "State": "New Jersey",
      "Phone": "[201] 4326441 / [201] 7925792",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Red Dragon Martial Arts Academy",
      "Address": "10 N.Arlington St., Manville ",
      "ZipCode": 8835,
      "State": "New Jersey",
      "Phone": "[908] 2530022",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "South Jersey Tactical Fighting Arts",
      "Address": "1438 Backline Road, Folsom ",
      "ZipCode": 8037,
      "State": "New Jersey",
      "Phone": "[609] 2045733",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Fil Am Kali and Silat of New Mexico",
      "Address": "Rio Rancho ",
      "ZipCode": 87124,
      "State": "New Jersey",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Klose Kombat Arts ",
      "Address": "10500 La Paz NW, Albuquerque ",
      "ZipCode": 87114,
      "State": "New Jersey",
      "Phone": "[505] 3794615",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Takai Mine Karate ",
      "Address": "1027 Juan Tabo NE, Albuquerque ",
      "ZipCode": 87111,
      "State": "New Jersey",
      "Phone": "[505] 2946302",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Amerasian Defensive Arts Inc.",
      "Address": "2512 Elmwood Ave., Buffalo ",
      "ZipCode": 14217,
      "State": "New Jersey",
      "Phone": "[716] 4912716",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Americas Finest Self Defense Academy",
      "Address": "976 Leggett Ave suite 1B, Bronx ",
      "ZipCode": 10455,
      "State": "New Jersey",
      "Phone": "[718] 7878699 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Anderson's Martial Arts",
      "Address": "394 Broadway, 3rd Floor, New York ",
      "ZipCode": 10013,
      "State": "New Jersey",
      "Phone": "[212] 766 � 6622",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Atienza Kali",
      "Address": "New York",
      "ZipCode": "",
      "State": "New Jersey",
      "Phone": "[917] 5510603",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Brentwood Self Defense Academy",
      "Address": "115 South 2nd Street, Suite #10, Brentwood ",
      "ZipCode": 11701,
      "State": "New Jersey",
      "Phone": "[631] 3989525",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Calla Karate and JuJutsu",
      "Address": "1293 Castleton Ave. (corner of clove rd.), Staten Islands ",
      "ZipCode": 10310,
      "State": "New Jersey",
      "Phone": "[718] 7202509 / [917] 4394969",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "EBMAS NYC Latosa Escrima",
      "Address": "316 East 63rd St., New York ",
      "ZipCode": 10065,
      "State": "New Jersey",
      "Phone": "[855] 5532627",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Erie Community College (South Campus)",
      "Address": "Principal Instructor/Adjunct Professor, 4041, Southwestern Blvd, Orchard Park ",
      "ZipCode": 14127,
      "State": "New Jersey",
      "Phone": "[716] 2702679",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "FMA Academy",
      "Address": "2792 Erie Blvd E., Syracuse ",
      "ZipCode": 13224,
      "State": "New Jersey",
      "Phone": "[315] 313KALI (5254)",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "FMA Kali Arnis Eskrima International",
      "Address": "475 Onderdonk Ave., Ridgewood, New York ",
      "ZipCode": 11385,
      "State": "New Jersey",
      "Phone": "[347] 3856771",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali / Arnis / Eskrima"
    },
    {
      "Name": "Horizon Martial Arts",
      "Address": " 252 Center Rd., West Seneca ",
      "ZipCode": 14224,
      "State": "New Jersey",
      "Phone": "[716] 6750899",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kapatiran Mandirigma NYC",
      "Address": "New York ",
      "ZipCode": 10003,
      "State": "New Jersey",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kapatid Martial Arts Academy",
      "Address": "175 Tompkins Ave., Pleasantville ",
      "ZipCode": 10570,
      "State": "New Jersey",
      "Phone": "[914] 7415550",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Klasi Kali 306 Gold St",
      "Address": "New York ",
      "ZipCode": 10003,
      "State": "New Jersey",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Kuntaw Kali Kruzada",
      "Address": "122 West 27th St. (2nd Flr.) (Between 6th & 7th Ave.), New York ",
      "ZipCode": 10001,
      "State": "New Jersey",
      "Phone": "[201] 6746609",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Kuntaw Martial Arts (Kuntaw New York)",
      "Address": "753 Flatbush Ave 2nd FL, Brooklyn ",
      "ZipCode": 11226,
      "State": "New Jersey",
      "Phone": "[347] 5850088",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kwikstik Martial Arts",
      "Address": "Jamaica ",
      "ZipCode": 11432,
      "State": "New Jersey",
      "Phone": "[718] 7393266",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Latosa Escrima at Fighthouse",
      "Address": "122 West 27 St. 2nd Floor , New York",
      "ZipCode": 10001,
      "State": "New Jersey",
      "Phone": "[646] 3697704",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Latosa Escrima NY",
      "Address": "316 7th St. (Corner of 5th Avenue 2nd Fl.), Brooklyn, (Park Slope) ",
      "ZipCode": 11215,
      "State": "New Jersey",
      "Phone": "[646] 3697704",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Modern Arnis Domog",
      "Address": "188 East 3rd. St. (Between Ave. A & B), New York ",
      "ZipCode": 10009,
      "State": "New Jersey",
      "Phone": "[212] 6143250",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Modern Fighting Arts Academy",
      "Address": "509 Hicksville Rd., Massapequa ",
      "ZipCode": 11758,
      "State": "New Jersey",
      "Phone": "[516] 8174374",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Neo Tribe Kali",
      "Address": "122 West 27th Street, 2nd Floor, New York ",
      "ZipCode": 10001,
      "State": "New Jersey",
      "Phone": "[347] 2569291",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "New York Eskrima LLC",
      "Address": "New York",
      "ZipCode": "",
      "State": "New Jersey",
      "Phone": "[646] 2101542",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Northeastern Martial Arts Institute",
      "Address": "Chili Paul Plaza, 3240 Chili Ave., Rochester ",
      "ZipCode": 14624,
      "State": "New Jersey",
      "Phone": "[585] 8897330",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Nubreed Martial Arts Academy",
      "Address": "1248 Clintonville St., Whitestone ",
      "ZipCode": 11357,
      "State": "New Jersey",
      "Phone": "[718] 7472550",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Olaanalo Eskrima New York",
      "Address": "3 Elm St,, Walden ",
      "ZipCode": 12586,
      "State": "New Jersey",
      "Phone": "[845] 7784402",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Pananandata Marinas 2 Worlds Dance + Fitness",
      "Address": "340 Wheatley Plaza, Greenvale ",
      "ZipCode": 11548,
      "State": "New Jersey",
      "Phone": "[516] 4846604",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Phoenix Martial Arts",
      "Address": "344 Jericho Turnpike, Floral Park ",
      "ZipCode": 11001,
      "State": "New Jersey",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Rochester kali",
      "Address": "Rochester ",
      "ZipCode": 14617,
      "State": "New Jersey",
      "Phone": "[585] 752 7827",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "kali"
    },
    {
      "Name": "Progressive Martial Arts",
      "Address": "17525 Horace Harding Expy, Fresh Meadows ",
      "ZipCode": 11365,
      "State": "New Jersey",
      "Phone": "[718] 4610700",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Rising Phoenix Martial Arts",
      "Address": "Temple Hill Rd., New Windsor ",
      "ZipCode": 12553,
      "State": "New Jersey",
      "Phone": "[845] 7844359",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Rochester Kali",
      "Address": "Rochester ",
      "ZipCode": 14617,
      "State": "New Jersey",
      "Phone": "[585] 752 7827",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "San Miguel Eskrima",
      "Address": "226 Laurel Road, East Northport ",
      "ZipCode": 11731,
      "State": "New Jersey",
      "Phone": "[631] 7487671",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Sirat As Sayf MMA/FMA & Fitness Center",
      "Address": "13501 Liberty Ave., Richmond Hill ",
      "ZipCode": 11419,
      "State": "New Jersey",
      "Phone": "[646] 3977417",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tactics Martial Arts Studio",
      "Address": "1315 Hempstead Turnpike, Elmont ",
      "ZipCode": 11003,
      "State": "New Jersey",
      "Phone": "[559] 6975633",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tom Gallo Tactics Life Health & Fitness Club",
      "Address": "3711 35 Ave., Astoria ",
      "ZipCode": 11101,
      "State": "New Jersey",
      "Phone": "[559] 6975633",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Vee Arnis Jitsu School of Self Defense",
      "Address": "25 Park Place, 2nd Floor, New York ",
      "ZipCode": 10007,
      "State": "New Jersey",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Vee Do Kwan U.S.A.",
      "Address": "3944 24 St., Long Island City ",
      "ZipCode": 11101,
      "State": "New Jersey",
      "Phone": "[718] 3619569",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Westchester Martial Arts Academy",
      "Address": "3 Sunnyside Terrace, Eastchester ",
      "ZipCode": 10709,
      "State": "New Jersey",
      "Phone": "[914] 9611800",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Westchester School of Arnis",
      "Address": "White Plains",
      "ZipCode": "",
      "State": "New Jersey",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Wing Chun Kali",
      "Address": "Westchester County ",
      "ZipCode": 10710,
      "State": "New Jersey",
      "Phone": "[646] 6451141",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "World Kali Silat Society",
      "Address": "432 East 14 St. Box 638, New York ",
      "ZipCode": 10009,
      "State": "New Jersey",
      "Phone": "[212] 9791646",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "W.S.B.P. Eastern U.S. Chapter",
      "Address": " 5291 Seneca Point Rd., Canandaigua ",
      "ZipCode": 14424,
      "State": "New Jersey",
      "Phone": "[585] 8203172",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Counterpoint Tactical System",
      "Address": "182 Broadview Circle, Mooresville ",
      "ZipCode": 28117,
      "State": "North Carolina",
      "Phone": "[650] 2699726",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Fighting Edge",
      "Address": "Fort Bragg ",
      "ZipCode": 28310,
      "State": "North Carolina",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kuntaw Palace",
      "Address": "122 S. Goldsboro St., Wilson ",
      "ZipCode": 27893,
      "State": "North Carolina",
      "Phone": "[252] 2067900",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pami Kol Street Survival Self Defense",
      "Address": "1612 Camden Rd. [Massey Hill Rec. Ctr], Fayetteville ",
      "ZipCode": 28306,
      "State": "North Carolina",
      "Phone": "[910] 4331569",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Stover's Martial Arts Academy",
      "Address": "3722 Carolina Beach Rd., Wilmington ",
      "ZipCode": 28412,
      "State": "North Carolina",
      "Phone": "[910] 7921762",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Sanano Karate Club / Trecehampas",
      "Address": "Box 386, North Dakota ",
      "ZipCode": 58530,
      "State": "North Dakota",
      "Phone": "[701] 7943399",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Academy of Filipino Martial Arts",
      "Address": "90 North Diamond St., Mansfield ",
      "ZipCode": 44906,
      "State": "Ohio",
      "Phone": "[419] 5572416",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Bob Yoder's Kung Fu and Kickboxing Academy",
      "Address": "2048 Sondra Ln., Grove City ",
      "ZipCode": 43123,
      "State": "Ohio",
      "Phone": "[614] 6495971",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Cincinnati Jeet Kune Do",
      "Address": "5116 CrookShank Rd., Cincinnati ",
      "ZipCode": 45238,
      "State": "Ohio",
      "Phone": "[513] 3647300",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Diversified Combat Arts and Sciences [Hikazelearningcorner]",
      "Address": "Wooster",
      "ZipCode": "",
      "State": "Ohio",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "HAMA Martial Arts",
      "Address": "Parma",
      "ZipCode": "",
      "State": "Ohio",
      "Phone": "[440] 6223684",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "MAKTAN Filipino Martial Arts",
      "Address": "6875 Fountain Blvd. Suite K, Cincinnati ",
      "ZipCode": 45069,
      "State": "Ohio",
      "Phone": "[513] 2189042",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Philippine Martial Arts Institute",
      "Address": "12613 State Rd, North Royalton ",
      "ZipCode": 44133,
      "State": "Ohio",
      "Phone": "[440] 2374138",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "38131 Airport Parkway",
      "Address": "Unit 203, Willoughby, OH. ",
      "ZipCode": 44094,
      "State": "Ohio",
      "Phone": "[440] 2417450",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Serrada Eskrido Academy",
      "Address": "315 Kendal Ct. East, Amherst ",
      "ZipCode": 44001,
      "State": "Ohio",
      "Phone": "[440] 6106600",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "TAMA Martial Arts",
      "Address": "1753 Woodman Dr., Kettering ",
      "ZipCode": 45420,
      "State": "Ohio",
      "Phone": "[937] 2547035",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Adams Muay Thai Kali Academy",
      "Address": "6703 E. 81st. ST. Unit H, Tulsa ",
      "ZipCode": 74133,
      "State": "Oklahoma",
      "Phone": "[918] 4880707",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "MDT Martial Arts",
      "Address": "Oklahoma City",
      "ZipCode": "",
      "State": "Oklahoma",
      "Phone": "[405] 4208135",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Silent Warrior Arts",
      "Address": "8300 Glade Ave., Oklahoma City ",
      "ZipCode": 73132,
      "State": "Oklahoma",
      "Phone": "[405] 6265171",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Tulsa Martial Arts",
      "Address": "5123 S. 110th East Ave., Tulsa ",
      "ZipCode": 74146,
      "State": "Oklahoma",
      "Phone": "[918] 2610160",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "A.P.I. International Combat Arts ",
      "Address": "12239 SE Stark St., Portland ",
      "ZipCode": 97233,
      "State": "Oregon",
      "Phone": "[503] 2874265",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Dan Anderson Karate School and Modern Arnis",
      "Address": "311 NE Roberts St., Gresham ",
      "ZipCode": 97030,
      "State": "Oregon",
      "Phone": "[503] 6658596",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Ernie Reyes' World Martial Arts",
      "Address": " 3075 SW 234th Ave Suite 103, Hillsboro ",
      "ZipCode": 97123,
      "State": "Oregon",
      "Phone": "[503] 6421500",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Escrima Arnis Kali San Soo Oregon",
      "Address": "P.O. Box 3412, Ashland ",
      "ZipCode": 97520,
      "State": "Oregon",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima / Arnis / Kali"
    },
    {
      "Name": "Eskabo Da�an",
      "Address": "5040 SE Milwaukie Ave., Portland ",
      "ZipCode": 97215,
      "State": "Oregon",
      "Phone": "[503] 3819145",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kombatan Martial Arts Academy",
      "Address": "15875 SE 114 Ave. Suite O, Clackamas ",
      "ZipCode": 97015,
      "State": "Oregon",
      "Phone": "[503] 6573408",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Makoa Combatives Group",
      "Address": "3137 SW Primrose street #8, Portland ",
      "ZipCode": 97219,
      "State": "Oregon",
      "Phone": "[971] 5064610",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Northwest Fighting Arts",
      "Address": "1200 SE Morrison, Portland ",
      "ZipCode": 97214,
      "State": "Oregon",
      "Phone": "[503] 7402666",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Taodragon Martial Arts",
      "Address": "PO Box 11157, Eugene ",
      "ZipCode": 97440,
      "State": "Oregon",
      "Phone": "[541] 6831271",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Cebu West",
      "Address": "Unity and Sutton Ave., Folsom ",
      "ZipCode": 19033,
      "State": "Pennsylvania",
      "Phone": "[610] 3069308",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kiski Martial Arts",
      "Address": "1155 Wildlife Lodge Rd, Lower Burrell ",
      "ZipCode": 15068,
      "State": "Pennsylvania",
      "Phone": "[724] 3345868",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kuntao Martial Arts Club",
      "Address": "Franklin Commons, 400 Franklin Ave. Suite 245, Phoenixville ",
      "ZipCode": 19460,
      "State": "Pennsylvania",
      "Phone": "[610] 2373902 ext. 803",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Lathen Martial Arts",
      "Address": " 257 West Riverview Ave., Pittsburgh ",
      "ZipCode": 15202,
      "State": "Pennsylvania",
      "Phone": "[412] 7345254 (kali)",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Pennsylvania Pinakatay Arnis",
      "Address": "Forest Hills, Pittsburgh ",
      "ZipCode": 15221,
      "State": "Pennsylvania",
      "Phone": "[412]7797738",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "PTKPA 342 Pottstown Pike",
      "Address": "Exton ",
      "ZipCode": 19341,
      "State": "Pennsylvania",
      "Phone": "[610] 6399041",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Ryer Martial Arts Academy",
      "Address": "5440 Centre Ave., Pittsburgh ",
      "ZipCode": 15232,
      "State": "Pennsylvania",
      "Phone": "[412] 6217937",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Senkotiros",
      "Address": "499 Spruce St., St Marys, PA ",
      "ZipCode": 15857,
      "State": "Pennsylvania",
      "Phone": "(814) 5125001",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "State College Martial Arts Academy",
      "Address": "412 W. College Ave., State College ",
      "ZipCode": 16801,
      "State": "Pennsylvania",
      "Phone": "[814] 2351015",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Three Rivers Eskrima Concepts",
      "Address": "529 8th St., Ambridge ",
      "ZipCode": 15003,
      "State": "Pennsylvania",
      "Phone": "[724] 6501019",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "TriState Martial Arts Academy",
      "Address": "670 Woodbourne, Rd. Suite 300, Langhorne ",
      "ZipCode": 19047,
      "State": "Pennsylvania",
      "Phone": "[215] 7417041",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Warren School of Self Defense",
      "Address": "200 Liberty St., Warren ",
      "ZipCode": 16365,
      "State": "Pennsylvania",
      "Phone": "[814] 6889707",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Combative Arts Academy",
      "Address": "33 Shadey lea Rd., North Kingston ",
      "ZipCode": 2852,
      "State": "Rhode Island",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Combative Arts Academy",
      "Address": "33 Shadey lea Rd., North Kingston ",
      "ZipCode": 2852,
      "State": "South Carolina",
      "Phone": "[843] 4973691",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Ocean Martial Arts Academy",
      "Address": "407 79th Ave, N., Myrtle Beach ",
      "ZipCode": 29572,
      "State": "South Dakota",
      "Phone": "[605] 3482639",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Sanano Karate Club",
      "Address": "1019 Farlow Ave., Rapid City 57701",
      "ZipCode": 889,
      "State": "Tennessee",
      "Phone": "[423] 3336132",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Inayan Martial Arts Academy",
      "Address": "30050 Axley Chapel, Greenback ",
      "ZipCode": 37742,
      "State": "Tennessee",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Academy of Modern Martial Arts",
      "Address": "2501 Texas Ave., College Station",
      "ZipCode": "",
      "State": "Texas",
      "Phone": "[979] 2554311",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Carrollton Martial Arts",
      "Address": "3733 N. Josey Ln., #108B, Carrollton ",
      "ZipCode": 75007,
      "State": "Texas",
      "Phone": "[972] 3952589",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Cedar Hill Martial Arts Center",
      "Address": "310 E. Parkerville Rd., Cedar Hill ",
      "ZipCode": 75104,
      "State": "Texas",
      "Phone": "[972] 2932504",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Central Texas Academy of Martial Arts",
      "Address": " 1304 West Hopkings, San Marcos ",
      "ZipCode": 78666,
      "State": "Texas",
      "Phone": "[512] 3931360",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Crows Martial Arts Academy",
      "Address": "2132 College Ave. Suite 600, Carrollton ",
      "ZipCode": 75006,
      "State": "Texas",
      "Phone": "[972] 4460024",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "DAMAGINC Kali Combatives",
      "Address": "Houston ",
      "ZipCode": 77377,
      "State": "Texas",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Fighting Method University",
      "Address": "4840 Hwy 377 South, Fort Worth ",
      "ZipCode": 76108,
      "State": "Texas",
      "Phone": "[817] 9388888",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino American School of Combat Arts",
      "Address": "10304 Dyer St., El Paso ",
      "ZipCode": 79924,
      "State": "Texas",
      "Phone": "[915] 8219310",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Garland Martial Arts Center ",
      "Address": "2510 Crosslands Dr., Garland ",
      "ZipCode": 75040,
      "State": "Texas",
      "Phone": "(214) 7976202",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Hidden Sword Martial Arts",
      "Address": "501 Roanoke Rd (Roanoke Recreation Center), Roanoke ",
      "ZipCode": 76262,
      "State": "Texas",
      "Phone": "[682] 5647078",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Houston Martial Arts Academy",
      "Address": "(inside the Downtown Club at Houston Center), Houston ",
      "ZipCode": 77010,
      "State": "Texas",
      "Phone": "[713] 5506575",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Imua Tamaraw Escrima Kuntaw",
      "Address": "2324 Goilad Rd., San Antonio ",
      "ZipCode": 78223,
      "State": "Texas",
      "Phone": "[210] 3179463",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "K3Lightning' (LSAI/LESKAS)",
      "Address": "Richmond ",
      "ZipCode": 77469,
      "State": "Texas",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Kali San Antonio",
      "Address": "San Antonio",
      "ZipCode": "",
      "State": "Texas",
      "Phone": "[210] 7970149 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Kali Silat Combat Science ",
      "Address": "104 Eagle Ave., Sheppard AFB ",
      "ZipCode": 76311,
      "State": "Texas",
      "Phone": "[940] 6424112 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Mano De Guerra Escrima ",
      "Address": "1150 D. Richardine, Austin ",
      "ZipCode": 78721,
      "State": "Texas",
      "Phone": "[512] 902 1228 / [512] 926 7 050",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Mid Cities Arnis",
      "Address": "NRH Centre, 6000 Hawk Ave., North Richland Hills ",
      "ZipCode": 76182,
      "State": "Texas",
      "Phone": "[682] 2077523",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Mousel's Self Defense Academy",
      "Address": " 747 N. Shepherd, Suite 400, Houston ",
      "ZipCode": 77007,
      "State": "Texas",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "PKA: Philippine Kali Association (Katipunan)",
      "Address": "642 W. University Ave 152, Denton ",
      "ZipCode": 76201,
      "State": "Texas",
      "Phone": "[940] 4530030",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Plano Self Defense",
      "Address": "1947 Ave K. Suite 200, Plano ",
      "ZipCode": 75075,
      "State": "Texas",
      "Phone": "[972] 6333773 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Practical Defensive Tactics",
      "Address": "512 W. Broadway, Sweetwater ",
      "ZipCode": 79556,
      "State": "Texas",
      "Phone": "[325] 7253188 ",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Reid's Martial Arts Academy",
      "Address": "1434 N. Central Expressway Suite 109, McKinney ",
      "ZipCode": 75070,
      "State": "Texas",
      "Phone": "[972] 5482467",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Serrada Escrima of San Antonio",
      "Address": "San Pedro Park, San Antonio ",
      "ZipCode": 78201,
      "State": "Texas",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "Siete Pares Escrima",
      "Address": "San Antonio",
      "ZipCode": "",
      "State": "Texas",
      "Phone": "[210] 3671877",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Escrima"
    },
    {
      "Name": "U.S. Karate Systems",
      "Address": "505 W University Ave, Suite E, Georgetown ",
      "ZipCode": 78626,
      "State": "Texas",
      "Phone": "[512] 8692615",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Warrior's Way Martial Arts Academy",
      "Address": "4020 Rhea Rd Ste 7c, Wichita Falls ",
      "ZipCode": 76308,
      "State": "Texas",
      "Phone": "[940] 6961254",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Wu Hsin Kuen Academy of Martial Arts",
      "Address": "3909 W. Airport Freeway #200, Irving",
      "ZipCode": "",
      "State": "Texas",
      "Phone": "[972] 7682721",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Cielo y Tierra Arnis de Mano ",
      "Address": "2023 Candlelight Dr., Chesapeake ",
      "ZipCode": 23325,
      "State": "Virginia",
      "Phone": "[757] 424 7634",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Complete Fitness Concepts",
      "Address": "4425 Brookfiled Corp. Dr., Chantilly ",
      "ZipCode": 20151,
      "State": "Virginia",
      "Phone": "[703] 2838826",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Eastern Academy of Mixed Martial Arts",
      "Address": "3900 Bonney Road Suite 213, Virginia Beach ",
      "ZipCode": 23452,
      "State": "Virginia",
      "Phone": "[757] 4865200",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Filipino Fighting Arts Academy",
      "Address": "5347 Lila Lane, Suite 110, Virginia Beach ",
      "ZipCode": 23464,
      "State": "Virginia",
      "Phone": "[757] 4247005",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Impact Athletes Martial Arts Academy",
      "Address": "2421 Bowland Parkway, Suite 103, Virginia Beach ",
      "ZipCode": 23454,
      "State": "Virginia",
      "Phone": "[757] 6311003",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Muhammad's Boxing and Martial Arts",
      "Address": " 10208/Kings Highway, King George ",
      "ZipCode": 22485,
      "State": "Virginia",
      "Phone": "[540] 7757555",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "NoVa Modern Arnis",
      "Address": "8717 Trafalgar Ct., Springfield ",
      "ZipCode": 22151,
      "State": "Virginia",
      "Phone": "[571] 2399930",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "World Kali Silat Society",
      "Address": "2400 Atlantic Ave. # 121, Virginia Beach ",
      "ZipCode": 23458,
      "State": "Virginia",
      "Phone": "[757] 3735060",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Kali"
    },
    {
      "Name": "Bellingham Modern Arnis",
      "Address": "1420 Pacific Place, Suite B, Ferndale,",
      "ZipCode": 98248,
      "State": "Washington",
      "Phone": "[360] 2240232",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Bird's Martial Arts",
      "Address": " 5775 Soundview Dr,, Suite 101 A., Gig Harbor ",
      "ZipCode": 98335,
      "State": "Washington",
      "Phone": "[253] 8847914",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Blackbird Training Group",
      "Address": "Kennewick",
      "ZipCode": "",
      "State": "Washington",
      "Phone": "[206] 6123044",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Edmonds Martial Arts Academy",
      "Address": "Renton ",
      "ZipCode": 98059,
      "State": "Washington",
      "Phone": "[425] 4304269",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "FMS Alliance / Pinto Martial Arts",
      "Address": "Spokane",
      "ZipCode": "",
      "State": "Washington",
      "Phone": "[646] 5939650",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Hufana Traditional Arnis International",
      "Address": "14510 NE 20th Street, Suite 100, Bellevue ",
      "ZipCode": 98007,
      "State": "Washington",
      "Phone": "[425] 6438488",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "International Serrada Eskrima Society",
      "Address": "2850 SW Yancy #116, Seattle ",
      "ZipCode": 98126,
      "State": "Washington",
      "Phone": "[206] 9358218",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Eskrima"
    },
    {
      "Name": "Kalahi Martial Arts Academy",
      "Address": " Cascade Mall Dr., Burlington ",
      "ZipCode": 98233,
      "State": "Washington",
      "Phone": "[360] 7204313",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "LESKAS (Ballard / Crown Hill neighborhood)",
      "Address": "1475 NW 85th St., [in Ballard], Seattle ",
      "ZipCode": 98155,
      "State": "Washington",
      "Phone": "",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Little Dojo",
      "Address": "1726 East Isaacs, Walla Walla ",
      "ZipCode": 99362,
      "State": "Washington",
      "Phone": "[509] 5273385",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Manaois Systems International Martial Arts Academy",
      "Address": " 216 W. Broadway, Moses Lake ",
      "ZipCode": 98837,
      "State": "Washington",
      "Phone": "[509] 7710922",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Seattle Escrima Club",
      "Address": "917 E Yesler Way, Seattle ",
      "ZipCode": 98122,
      "State": "Washington",
      "Phone": "[234] 2060488",
      "Email": "",
      "Web URL": "",
      "Type": "Club",
      "Style": "Escrima"
    },
    {
      "Name": "Seattle Filipino Martial Arts Academy",
      "Address": "5659 California Ave. SW, Seattle ",
      "ZipCode": 98136,
      "State": "Washington",
      "Phone": "[206] 6183992",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Seattle Modern Arnis Academy",
      "Address": "5740 Martin Luther King Jr. Way, Seattle ",
      "ZipCode": 98122,
      "State": "Washington",
      "Phone": "[206] 8598363",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": "Arnis"
    },
    {
      "Name": "Nubreed Martial Arts Systems",
      "Address": "Rock Springs ",
      "ZipCode": 82901,
      "State": "Wyoming",
      "Phone": "[307] 3890339",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    },
    {
      "Name": "Wyoming Combatives Group",
      "Address": "2145 W. Teton, Green River ",
      "ZipCode": 82935,
      "State": "Wyoming",
      "Phone": "[307] 8710907",
      "Email": "",
      "Web URL": "",
      "Type": "school",
      "Style": ""
    }
  ];
  // {
  //   "Name": "Dynamic Mixed martial Arts - Mr. Brendan Neal",
  //   "Address": "1324 Essec Drive, Edwardsville",
  //   "ZipCode": 62025,
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
  // "ZipCode": 85003,
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
