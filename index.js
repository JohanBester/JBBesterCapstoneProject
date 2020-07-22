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

function homepageSelections() {
  // get user zip code input
  let zipCode = document.querySelector("#zipSearch").value;
  // get user radio button selection on home page
  let selectButton = document.querySelector('input[name="selectOptions"]:checked').value;
};


function searchFiltering() {
  // get user zip code input
  let zipCode = document.querySelector("#zipSearch").value;
  // get user state selection
  let stateDropdown = document.querySelector("#stateSearch");
  let state = stateDropdown.options[stateDropdown.selectedIndex].value;
  // get user search radius
  let radiusDropdown = document.querySelector("#radiusSearch");
  let radius = radiusDropdown.options[radiusDropdown.selectedIndex].value;
  // get user type selection
  let typeDropdown = document.querySelector("#typeSearch");
  let type = typeDropdown.options[typeDropdown.selectedIndex].value;
  // get user style selection
  let styleDropdown = document.querySelector("#styleSearch");
  let style = styleDropdown.options[styleDropdown.selectedIndex].value;
};


//****************************
// GET Zip Code Data from API
//****************************
let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function getZipCodeData(zipCode, radius = 50) {
    fetch(`"https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=DEMOAPIKEY"`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));  
};

//************************************
// Datasets for the data collections
//************************************
// Example DEMO data from API
let demoData = {
    "DataList": [
      {
        "Code": "62025",
        "City": "EDWARDSVILLE",
        "State": "IL",
        "Latitude": 38.855130000000,
        "Longitude": -89.948168000000,
        "County": "MADISON"
      },
      {
        "Code": "62026",
        "City": "EDWARDSVILLE",
        "State": "IL",
        "Latitude": 38.793699000000,
        "Longitude": -89.998742000000,
        "County": "MADISON",
        "Distance": 5.04
      },
      {
        "Code": "62067",
        "City": "MORO",
        "State": "IL",
        "Latitude": 38.932644000000,
        "Longitude": -89.990069000000,
        "County": "MADISON",
        "Distance": 5.80
      },
      {
        "Code": "62084",
        "City": "ROXANA",
        "State": "IL",
        "Latitude": 38.844700000000,
        "Longitude": -90.062498000000,
        "County": "MADISON",
        "Distance": 6.21
      },
      {
        "Code": "62046",
        "City": "HAMEL",
        "State": "IL",
        "Latitude": 38.894509000000,
        "Longitude": -89.843514000000,
        "County": "MADISON",
        "Distance": 6.26
      },
      {
        "Code": "62087",
        "City": "SOUTH ROXANA",
        "State": "IL",
        "Latitude": 38.819596000000,
        "Longitude": -90.058492000000,
        "County": "MADISON",
        "Distance": 6.44
      },
      {
        "Code": "62097",
        "City": "WORDEN",
        "State": "IL",
        "Latitude": 38.921846000000,
        "Longitude": -89.863757000000,
        "County": "MADISON",
        "Distance": 6.47
      },
      {
        "Code": "62034",
        "City": "GLEN CARBON",
        "State": "IL",
        "Latitude": 38.756532000000,
        "Longitude": -89.957127000000,
        "County": "MADISON",
        "Distance": 6.82
      },
      {
        "Code": "62095",
        "City": "WOOD RIVER",
        "State": "IL",
        "Latitude": 38.863044000000,
        "Longitude": -90.079284000000,
        "County": "MADISON",
        "Distance": 7.09
      },
      {
        "Code": "62024",
        "City": "EAST ALTON",
        "State": "IL",
        "Latitude": 38.843500000000,
        "Longitude": -90.079158000000,
        "County": "MADISON",
        "Distance": 7.11
      },
      {
        "Code": "62048",
        "City": "HARTFORD",
        "State": "IL",
        "Latitude": 38.825435000000,
        "Longitude": -90.088177000000,
        "County": "MADISON",
        "Distance": 7.83
      },
      {
        "Code": "62010",
        "City": "BETHALTO",
        "State": "IL",
        "Latitude": 38.933678000000,
        "Longitude": -90.057447000000,
        "County": "MADISON",
        "Distance": 8.00
      },
      {
        "Code": "62018",
        "City": "COTTAGE HILLS",
        "State": "IL",
        "Latitude": 38.909374000000,
        "Longitude": -90.086380000000,
        "County": "MADISON",
        "Distance": 8.34
      },
      {
        "Code": "62021",
        "City": "DORSEY",
        "State": "IL",
        "Latitude": 38.981897000000,
        "Longitude": -89.977118000000,
        "County": "MADISON",
        "Distance": 8.88
      },
      {
        "Code": "62062",
        "City": "MARYVILLE",
        "State": "IL",
        "Latitude": 38.725739000000,
        "Longitude": -89.965984000000,
        "County": "MADISON",
        "Distance": 8.98
      },
      {
        "Code": "62061",
        "City": "MARINE",
        "State": "IL",
        "Latitude": 38.786202000000,
        "Longitude": -89.794306000000,
        "County": "MADISON",
        "Distance": 9.57
      },
      {
        "Code": "62294",
        "City": "TROY",
        "State": "IL",
        "Latitude": 38.702961000000,
        "Longitude": -89.878857000000,
        "County": "MADISON",
        "Distance": 11.14
      },
      {
        "Code": "62234",
        "City": "COLLINSVILLE",
        "State": "IL",
        "Latitude": 38.691315000000,
        "Longitude": -89.970639000000,
        "County": "MADISON",
        "Distance": 11.36
      },
      {
        "Code": "62001",
        "City": "ALHAMBRA",
        "State": "IL",
        "Latitude": 38.881021000000,
        "Longitude": -89.739585000000,
        "County": "MADISON",
        "Distance": 11.39
      },
      {
        "Code": "62002",
        "City": "ALTON",
        "State": "IL",
        "Latitude": 38.939095000000,
        "Longitude": -90.132125000000,
        "County": "MADISON",
        "Distance": 11.48
      },
      {
        "Code": "62040",
        "City": "GRANITE CITY",
        "State": "IL",
        "Latitude": 38.732317000000,
        "Longitude": -90.106957000000,
        "County": "MADISON",
        "Distance": 12.05
      },
      {
        "Code": "62058",
        "City": "LIVINGSTON",
        "State": "IL",
        "Latitude": 38.967840000000,
        "Longitude": -89.763914000000,
        "County": "MADISON",
        "Distance": 12.61
      },
      {
        "Code": "63138",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.804492000000,
        "Longitude": -90.178286000000,
        "County": "SAINT LOUIS",
        "Distance": 12.90
      },
      {
        "Code": "62281",
        "City": "SAINT JACOB",
        "State": "IL",
        "Latitude": 38.708873000000,
        "Longitude": -89.791702000000,
        "County": "MADISON",
        "Distance": 13.16
      },
      {
        "Code": "62014",
        "City": "BUNKER HILL",
        "State": "IL",
        "Latitude": 39.049581000000,
        "Longitude": -89.951501000000,
        "County": "MACOUPIN",
        "Distance": 13.41
      },
      {
        "Code": "62088",
        "City": "STAUNTON",
        "State": "IL",
        "Latitude": 39.016386000000,
        "Longitude": -89.797713000000,
        "County": "MACOUPIN",
        "Distance": 13.76
      },
      {
        "Code": "63386",
        "City": "WEST ALTON",
        "State": "MO",
        "Latitude": 38.869398000000,
        "Longitude": -90.221967000000,
        "County": "SAINT CHARLES",
        "Distance": 14.80
      },
      {
        "Code": "62093",
        "City": "WILSONVILLE",
        "State": "IL",
        "Latitude": 39.068592000000,
        "Longitude": -89.856534000000,
        "County": "MACOUPIN",
        "Distance": 15.53
      },
      {
        "Code": "62074",
        "City": "NEW DOUGLAS",
        "State": "IL",
        "Latitude": 38.954880000000,
        "Longitude": -89.688126000000,
        "County": "MADISON",
        "Distance": 15.61
      },
      {
        "Code": "63137",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.748063000000,
        "Longitude": -90.203917000000,
        "County": "SAINT LOUIS",
        "Distance": 15.66
      },
      {
        "Code": "62232",
        "City": "CASEYVILLE",
        "State": "IL",
        "Latitude": 38.629640000000,
        "Longitude": -90.013594000000,
        "County": "SAINT CLAIR",
        "Distance": 15.95
      },
      {
        "Code": "62012",
        "City": "BRIGHTON",
        "State": "IL",
        "Latitude": 39.033406000000,
        "Longitude": -90.140568000000,
        "County": "MACOUPIN",
        "Distance": 16.08
      },
      {
        "Code": "62060",
        "City": "MADISON",
        "State": "IL",
        "Latitude": 38.673458000000,
        "Longitude": -90.149546000000,
        "County": "MADISON",
        "Distance": 16.59
      },
      {
        "Code": "62249",
        "City": "HIGHLAND",
        "State": "IL",
        "Latitude": 38.764768000000,
        "Longitude": -89.657682000000,
        "County": "MADISON",
        "Distance": 16.87
      },
      {
        "Code": "62035",
        "City": "GODFREY",
        "State": "IL",
        "Latitude": 38.961382000000,
        "Longitude": -90.231300000000,
        "County": "MADISON",
        "Distance": 16.93
      },
      {
        "Code": "62085",
        "City": "SAWYERVILLE",
        "State": "IL",
        "Latitude": 39.078048000000,
        "Longitude": -89.806257000000,
        "County": "MACOUPIN",
        "Distance": 17.17
      },
      {
        "Code": "62204",
        "City": "EAST SAINT LOUIS",
        "State": "IL",
        "Latitude": 38.631174000000,
        "Longitude": -90.095002000000,
        "County": "SAINT CLAIR",
        "Distance": 17.37
      },
      {
        "Code": "62090",
        "City": "VENICE",
        "State": "IL",
        "Latitude": 38.670254000000,
        "Longitude": -90.169600000000,
        "County": "MADISON",
        "Distance": 17.48
      },
      {
        "Code": "62269",
        "City": "O FALLON",
        "State": "IL",
        "Latitude": 38.604200000000,
        "Longitude": -89.901070000000,
        "County": "SAINT CLAIR",
        "Distance": 17.49
      },
      {
        "Code": "62254",
        "City": "LEBANON",
        "State": "IL",
        "Latitude": 38.612424000000,
        "Longitude": -89.828872000000,
        "County": "SAINT CLAIR",
        "Distance": 17.94
      },
      {
        "Code": "63033",
        "City": "FLORISSANT",
        "State": "MO",
        "Latitude": 38.796514000000,
        "Longitude": -90.274334000000,
        "County": "SAINT LOUIS",
        "Distance": 18.06
      },
      {
        "Code": "62208",
        "City": "FAIRVIEW HEIGHTS",
        "State": "IL",
        "Latitude": 38.596894000000,
        "Longitude": -90.005164000000,
        "County": "SAINT CLAIR",
        "Distance": 18.08
      },
      {
        "Code": "63034",
        "City": "FLORISSANT",
        "State": "MO",
        "Latitude": 38.849722000000,
        "Longitude": -90.283870000000,
        "County": "SAINT LOUIS",
        "Distance": 18.11
      },
      {
        "Code": "62071",
        "City": "NATIONAL STOCK YARDS",
        "State": "IL",
        "Latitude": 38.644500000000,
        "Longitude": -90.150300000000,
        "County": "SAINT CLAIR",
        "Distance": 18.17
      },
      {
        "Code": "62201",
        "City": "EAST SAINT LOUIS",
        "State": "IL",
        "Latitude": 38.631246000000,
        "Longitude": -90.126625000000,
        "County": "SAINT CLAIR",
        "Distance": 18.20
      },
      {
        "Code": "62009",
        "City": "BENLD",
        "State": "IL",
        "Latitude": 39.093560000000,
        "Longitude": -89.798932000000,
        "County": "MACOUPIN",
        "Distance": 18.30
      },
      {
        "Code": "62059",
        "City": "LOVEJOY",
        "State": "IL",
        "Latitude": 38.653399000000,
        "Longitude": -90.170263000000,
        "County": "SAINT CLAIR",
        "Distance": 18.37
      },
      {
        "Code": "63147",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.690768000000,
        "Longitude": -90.218058000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 18.46
      },
      {
        "Code": "63136",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.743678000000,
        "Longitude": -90.260106000000,
        "County": "SAINT LOUIS",
        "Distance": 18.51
      },
      {
        "Code": "62069",
        "City": "MOUNT OLIVE",
        "State": "IL",
        "Latitude": 39.087231000000,
        "Longitude": -89.750605000000,
        "County": "MACOUPIN",
        "Distance": 19.22
      },
      {
        "Code": "62203",
        "City": "EAST SAINT LOUIS",
        "State": "IL",
        "Latitude": 38.594327000000,
        "Longitude": -90.075652000000,
        "County": "SAINT CLAIR",
        "Distance": 19.26
      },
      {
        "Code": "63107",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.667326000000,
        "Longitude": -90.212951000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 19.30
      },
      {
        "Code": "62202",
        "City": "EAST SAINT LOUIS",
        "State": "IL",
        "Latitude": 38.624600000000,
        "Longitude": -90.150500000000,
        "County": "SAINT CLAIR",
        "Distance": 19.30
      },
      {
        "Code": "62205",
        "City": "EAST SAINT LOUIS",
        "State": "IL",
        "Latitude": 38.603710000000,
        "Longitude": -90.115788000000,
        "County": "SAINT CLAIR",
        "Distance": 19.56
      },
      {
        "Code": "62273",
        "City": "PIERRON",
        "State": "IL",
        "Latitude": 38.779754000000,
        "Longitude": -89.596848000000,
        "County": "BOND",
        "Distance": 19.66
      },
      {
        "Code": "62023",
        "City": "EAGARVILLE",
        "State": "IL",
        "Latitude": 39.109834000000,
        "Longitude": -89.783737000000,
        "County": "MACOUPIN",
        "Distance": 19.67
      },
      {
        "Code": "63115",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.685786000000,
        "Longitude": -90.241188000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 19.67
      },
      {
        "Code": "63102",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.635551000000,
        "Longitude": -90.189665000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 19.99
      },
      {
        "Code": "63106",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.644158000000,
        "Longitude": -90.208316000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.23
      },
      {
        "Code": "62685",
        "City": "SHIPMAN",
        "State": "IL",
        "Latitude": 39.145411000000,
        "Longitude": -90.007436000000,
        "County": "MACOUPIN",
        "Distance": 20.28
      },
      {
        "Code": "63101",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.631372000000,
        "Longitude": -90.192381000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.30
      },
      {
        "Code": "63120",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.689674000000,
        "Longitude": -90.261206000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.40
      },
      {
        "Code": "63135",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.744678000000,
        "Longitude": -90.300072000000,
        "County": "SAINT LOUIS",
        "Distance": 20.47
      },
      {
        "Code": "62079",
        "City": "PIASA",
        "State": "IL",
        "Latitude": 39.116516000000,
        "Longitude": -90.131131000000,
        "County": "MACOUPIN",
        "Distance": 20.55
      },
      {
        "Code": "63158",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63197",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63180",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63032",
        "City": "FLORISSANT",
        "State": "MO",
        "Latitude": 38.789300000000,
        "Longitude": -90.322600000000,
        "County": "SAINT LOUIS",
        "Distance": 20.71
      },
      {
        "Code": "63177",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63163",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63195",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63157",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63169",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63188",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63150",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63199",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63164",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63178",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63156",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63166",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63171",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63160",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63179",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627200000000,
        "Longitude": -90.197800000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.71
      },
      {
        "Code": "63167",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.632800000000,
        "Longitude": -90.206200000000,
        "County": "SAINT LOUIS",
        "Distance": 20.72
      },
      {
        "Code": "62289",
        "City": "SUMMERFIELD",
        "State": "IL",
        "Latitude": 38.596057000000,
        "Longitude": -89.751244000000,
        "County": "SAINT CLAIR",
        "Distance": 20.80
      },
      {
        "Code": "63155",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.627800000000,
        "Longitude": -90.201700000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 20.82
      },
      {
        "Code": "62207",
        "City": "EAST SAINT LOUIS",
        "State": "IL",
        "Latitude": 38.583538000000,
        "Longitude": -90.128381000000,
        "County": "SAINT CLAIR",
        "Distance": 21.11
      },
      {
        "Code": "63113",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.657436000000,
        "Longitude": -90.246970000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 21.13
      },
      {
        "Code": "63103",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.629763000000,
        "Longitude": -90.216455000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 21.25
      },
      {
        "Code": "62086",
        "City": "SORENTO",
        "State": "IL",
        "Latitude": 38.966457000000,
        "Longitude": -89.577954000000,
        "County": "BOND",
        "Distance": 21.38
      },
      {
        "Code": "62293",
        "City": "TRENTON",
        "State": "IL",
        "Latitude": 38.630129000000,
        "Longitude": -89.672142000000,
        "County": "CLINTON",
        "Distance": 21.52
      },
      {
        "Code": "63121",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.707438000000,
        "Longitude": -90.303006000000,
        "County": "SAINT LOUIS",
        "Distance": 21.70
      },
      {
        "Code": "62033",
        "City": "GILLESPIE",
        "State": "IL",
        "Latitude": 39.159666000000,
        "Longitude": -89.846750000000,
        "County": "MACOUPIN",
        "Distance": 21.70
      },
      {
        "Code": "62275",
        "City": "POCAHONTAS",
        "State": "IL",
        "Latitude": 38.811412000000,
        "Longitude": -89.548218000000,
        "County": "BOND",
        "Distance": 21.79
      },
      {
        "Code": "62028",
        "City": "ELSAH",
        "State": "IL",
        "Latitude": 38.961522000000,
        "Longitude": -90.330677000000,
        "County": "JERSEY",
        "Distance": 21.88
      },
      {
        "Code": "63108",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.644609000000,
        "Longitude": -90.251982000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 21.91
      },
      {
        "Code": "62030",
        "City": "FIDELITY",
        "State": "IL",
        "Latitude": 39.128483000000,
        "Longitude": -90.156282000000,
        "County": "JERSEY",
        "Distance": 21.93
      },
      {
        "Code": "63140",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.737050000000,
        "Longitude": -90.326409000000,
        "County": "SAINT LOUIS",
        "Distance": 21.98
      },
      {
        "Code": "63104",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.607982000000,
        "Longitude": -90.212839000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 22.25
      },
      {
        "Code": "62225",
        "City": "SCOTT AIR FORCE BASE",
        "State": "IL",
        "Latitude": 38.540668000000,
        "Longitude": -89.851840000000,
        "County": "SAINT CLAIR",
        "Distance": 22.31
      },
      {
        "Code": "63112",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.660906000000,
        "Longitude": -90.282102000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 22.47
      },
      {
        "Code": "63134",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.743803000000,
        "Longitude": -90.341562000000,
        "County": "SAINT LOUIS",
        "Distance": 22.58
      },
      {
        "Code": "62091",
        "City": "WALSHVILLE",
        "State": "IL",
        "Latitude": 39.051746000000,
        "Longitude": -89.611505000000,
        "County": "MONTGOMERY",
        "Distance": 22.64
      },
      {
        "Code": "63133",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.680814000000,
        "Longitude": -90.304352000000,
        "County": "SAINT LOUIS",
        "Distance": 22.68
      },
      {
        "Code": "62206",
        "City": "EAST SAINT LOUIS",
        "State": "IL",
        "Latitude": 38.573069000000,
        "Longitude": -90.163714000000,
        "County": "SAINT CLAIR",
        "Distance": 22.68
      },
      {
        "Code": "62223",
        "City": "BELLEVILLE",
        "State": "IL",
        "Latitude": 38.533062000000,
        "Longitude": -90.052320000000,
        "County": "SAINT CLAIR",
        "Distance": 22.92
      },
      {
        "Code": "63031",
        "City": "FLORISSANT",
        "State": "MO",
        "Latitude": 38.814192000000,
        "Longitude": -90.372886000000,
        "County": "SAINT LOUIS",
        "Distance": 23.09
      },
      {
        "Code": "62222",
        "City": "BELLEVILLE",
        "State": "IL",
        "Latitude": 38.520000000000,
        "Longitude": -89.983800000000,
        "County": "SAINT CLAIR",
        "Distance": 23.20
      },
      {
        "Code": "62226",
        "City": "BELLEVILLE",
        "State": "IL",
        "Latitude": 38.519558000000,
        "Longitude": -89.994195000000,
        "County": "SAINT CLAIR",
        "Distance": 23.28
      },
      {
        "Code": "63110",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.626588000000,
        "Longitude": -90.269400000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 23.44
      },
      {
        "Code": "63145",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.746434000000,
        "Longitude": -90.361334000000,
        "County": "SAINT LOUIS",
        "Distance": 23.53
      },
      {
        "Code": "63118",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.592624000000,
        "Longitude": -90.229360000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 23.64
      },
      {
        "Code": "62022",
        "City": "DOW",
        "State": "IL",
        "Latitude": 39.043351000000,
        "Longitude": -90.320890000000,
        "County": "JERSEY",
        "Distance": 23.91
      },
      {
        "Code": "63130",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.665788000000,
        "Longitude": -90.322240000000,
        "County": "SAINT LOUIS",
        "Distance": 24.06
      },
      {
        "Code": "63042",
        "City": "HAZELWOOD",
        "State": "MO",
        "Latitude": 38.792465000000,
        "Longitude": -90.387003000000,
        "County": "SAINT LOUIS",
        "Distance": 24.07
      },
      {
        "Code": "62221",
        "City": "BELLEVILLE",
        "State": "IL",
        "Latitude": 38.507578000000,
        "Longitude": -89.899800000000,
        "County": "SAINT CLAIR",
        "Distance": 24.12
      },
      {
        "Code": "63373",
        "City": "PORTAGE DES SIOUX",
        "State": "MO",
        "Latitude": 38.923509000000,
        "Longitude": -90.396938000000,
        "County": "SAINT CHARLES",
        "Distance": 24.65
      },
      {
        "Code": "63114",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.700970000000,
        "Longitude": -90.360632000000,
        "County": "SAINT LOUIS",
        "Distance": 24.68
      },
      {
        "Code": "63139",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.613550000000,
        "Longitude": -90.291919000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 24.95
      },
      {
        "Code": "63105",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.645329000000,
        "Longitude": -90.326056000000,
        "County": "SAINT LOUIS",
        "Distance": 25.02
      },
      {
        "Code": "63074",
        "City": "SAINT ANN",
        "State": "MO",
        "Latitude": 38.726580000000,
        "Longitude": -90.389026000000,
        "County": "SAINT LOUIS",
        "Distance": 25.40
      },
      {
        "Code": "62216",
        "City": "AVISTON",
        "State": "IL",
        "Latitude": 38.599301000000,
        "Longitude": -89.605681000000,
        "County": "CLINTON",
        "Distance": 25.57
      },
      {
        "Code": "63116",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.581532000000,
        "Longitude": -90.268444000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 25.61
      },
      {
        "Code": "62077",
        "City": "PANAMA",
        "State": "IL",
        "Latitude": 39.031686000000,
        "Longitude": -89.523378000000,
        "County": "MONTGOMERY",
        "Distance": 25.92
      },
      {
        "Code": "63117",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.629872000000,
        "Longitude": -90.333081000000,
        "County": "SAINT LOUIS",
        "Distance": 25.96
      },
      {
        "Code": "62063",
        "City": "MEDORA",
        "State": "IL",
        "Latitude": 39.199908000000,
        "Longitude": -90.147180000000,
        "County": "JERSEY",
        "Distance": 26.08
      },
      {
        "Code": "62052",
        "City": "JERSEYVILLE",
        "State": "IL",
        "Latitude": 39.094154000000,
        "Longitude": -90.323822000000,
        "County": "JERSEY",
        "Distance": 26.10
      },
      {
        "Code": "63111",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.556389000000,
        "Longitude": -90.247072000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 26.18
      },
      {
        "Code": "63143",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.610536000000,
        "Longitude": -90.319340000000,
        "County": "SAINT LOUIS",
        "Distance": 26.21
      },
      {
        "Code": "63132",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.678414000000,
        "Longitude": -90.378417000000,
        "County": "SAINT LOUIS",
        "Distance": 26.24
      },
      {
        "Code": "62056",
        "City": "LITCHFIELD",
        "State": "IL",
        "Latitude": 39.183327000000,
        "Longitude": -89.700747000000,
        "County": "MONTGOMERY",
        "Distance": 26.26
      },
      {
        "Code": "63044",
        "City": "BRIDGETON",
        "State": "MO",
        "Latitude": 38.766252000000,
        "Longitude": -90.422146000000,
        "County": "SAINT LOUIS",
        "Distance": 26.30
      },
      {
        "Code": "62239",
        "City": "DUPO",
        "State": "IL",
        "Latitude": 38.519754000000,
        "Longitude": -90.182126000000,
        "County": "SAINT CLAIR",
        "Distance": 26.37
      },
      {
        "Code": "62240",
        "City": "EAST CARONDELET",
        "State": "IL",
        "Latitude": 38.528787000000,
        "Longitude": -90.204702000000,
        "County": "SAINT CLAIR",
        "Distance": 26.44
      },
      {
        "Code": "63109",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.581074000000,
        "Longitude": -90.295890000000,
        "County": "SAINT LOUIS CITY",
        "Distance": 26.65
      },
      {
        "Code": "62230",
        "City": "BREESE",
        "State": "IL",
        "Latitude": 38.650210000000,
        "Longitude": -89.528601000000,
        "County": "CLINTON",
        "Distance": 26.71
      },
      {
        "Code": "62220",
        "City": "BELLEVILLE",
        "State": "IL",
        "Latitude": 38.464852000000,
        "Longitude": -89.970888000000,
        "County": "SAINT CLAIR",
        "Distance": 26.95
      },
      {
        "Code": "63144",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.618213000000,
        "Longitude": -90.348428000000,
        "County": "SAINT LOUIS",
        "Distance": 27.10
      },
      {
        "Code": "63301",
        "City": "SAINT CHARLES",
        "State": "MO",
        "Latitude": 38.856848000000,
        "Longitude": -90.451614000000,
        "County": "SAINT CHARLES",
        "Distance": 27.15
      },
      {
        "Code": "62246",
        "City": "GREENVILLE",
        "State": "IL",
        "Latitude": 38.884343000000,
        "Longitude": -89.437550000000,
        "County": "BOND",
        "Distance": 27.61
      },
      {
        "Code": "63124",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.636646000000,
        "Longitude": -90.376897000000,
        "County": "SAINT LOUIS",
        "Distance": 27.63
      },
      {
        "Code": "63045",
        "City": "EARTH CITY",
        "State": "MO",
        "Latitude": 38.785723000000,
        "Longitude": -90.461727000000,
        "County": "SAINT LOUIS",
        "Distance": 28.12
      },
      {
        "Code": "62260",
        "City": "MILLSTADT",
        "State": "IL",
        "Latitude": 38.464312000000,
        "Longitude": -90.105668000000,
        "County": "SAINT CLAIR",
        "Distance": 28.27
      },
      {
        "Code": "63119",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.589214000000,
        "Longitude": -90.346604000000,
        "County": "SAINT LOUIS",
        "Distance": 28.28
      },
      {
        "Code": "62019",
        "City": "DONNELLSON",
        "State": "IL",
        "Latitude": 39.013088000000,
        "Longitude": -89.458419000000,
        "County": "MONTGOMERY",
        "Distance": 28.55
      },
      {
        "Code": "62245",
        "City": "GERMANTOWN",
        "State": "IL",
        "Latitude": 38.560668000000,
        "Longitude": -89.575681000000,
        "County": "CLINTON",
        "Distance": 28.60
      },
      {
        "Code": "63043",
        "City": "MARYLAND HEIGHTS",
        "State": "MO",
        "Latitude": 38.730854000000,
        "Longitude": -90.455710000000,
        "County": "SAINT LOUIS",
        "Distance": 28.71
      },
      {
        "Code": "62265",
        "City": "NEW BADEN",
        "State": "IL",
        "Latitude": 38.492130000000,
        "Longitude": -89.673206000000,
        "County": "CLINTON",
        "Distance": 29.12
      },
      {
        "Code": "63123",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.548788000000,
        "Longitude": -90.319760000000,
        "County": "SAINT LOUIS",
        "Distance": 29.15
      },
      {
        "Code": "62258",
        "City": "MASCOUTAH",
        "State": "IL",
        "Latitude": 38.454860000000,
        "Longitude": -89.775190000000,
        "County": "SAINT CLAIR",
        "Distance": 29.15
      },
      {
        "Code": "63302",
        "City": "SAINT CHARLES",
        "State": "MO",
        "Latitude": 38.783800000000,
        "Longitude": -90.481400000000,
        "County": "SAINT CHARLES",
        "Distance": 29.19
      },
      {
        "Code": "62630",
        "City": "CHESTERFIELD",
        "State": "IL",
        "Latitude": 39.268011000000,
        "Longitude": -90.092708000000,
        "County": "MACOUPIN",
        "Distance": 29.52
      },
      {
        "Code": "63146",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.709923000000,
        "Longitude": -90.463438000000,
        "County": "SAINT LOUIS",
        "Distance": 29.57
      },
      {
        "Code": "62626",
        "City": "CARLINVILLE",
        "State": "IL",
        "Latitude": 39.281792000000,
        "Longitude": -89.891155000000,
        "County": "MACOUPIN",
        "Distance": 29.59
      },
      {
        "Code": "62243",
        "City": "FREEBURG",
        "State": "IL",
        "Latitude": 38.426435000000,
        "Longitude": -89.904216000000,
        "County": "SAINT CLAIR",
        "Distance": 29.67
      },
      {
        "Code": "63125",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.519778000000,
        "Longitude": -90.296696000000,
        "County": "SAINT LOUIS",
        "Distance": 29.83
      },
      {
        "Code": "62266",
        "City": "NEW MEMPHIS",
        "State": "IL",
        "Latitude": 38.476856000000,
        "Longitude": -89.680932000000,
        "County": "CLINTON",
        "Distance": 29.83
      },
      {
        "Code": "62215",
        "City": "ALBERS",
        "State": "IL",
        "Latitude": 38.510346000000,
        "Longitude": -89.600650000000,
        "County": "CLINTON",
        "Distance": 30.31
      },
      {
        "Code": "62037",
        "City": "GRAFTON",
        "State": "IL",
        "Latitude": 39.020782000000,
        "Longitude": -90.471232000000,
        "County": "JERSEY",
        "Distance": 30.41
      },
      {
        "Code": "63141",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.655446000000,
        "Longitude": -90.452506000000,
        "County": "SAINT LOUIS",
        "Distance": 30.52
      },
      {
        "Code": "62089",
        "City": "TAYLOR SPRINGS",
        "State": "IL",
        "Latitude": 39.132876000000,
        "Longitude": -89.491508000000,
        "County": "MONTGOMERY",
        "Distance": 31.17
      },
      {
        "Code": "63126",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.549553000000,
        "Longitude": -90.379582000000,
        "County": "SAINT LOUIS",
        "Distance": 31.43
      },
      {
        "Code": "63131",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.615896000000,
        "Longitude": -90.445589000000,
        "County": "SAINT LOUIS",
        "Distance": 31.54
      },
      {
        "Code": "62236",
        "City": "COLUMBIA",
        "State": "IL",
        "Latitude": 38.445936000000,
        "Longitude": -90.212035000000,
        "County": "MONROE",
        "Distance": 31.63
      },
      {
        "Code": "62049",
        "City": "HILLSBORO",
        "State": "IL",
        "Latitude": 39.133427000000,
        "Longitude": -89.474587000000,
        "County": "MONTGOMERY",
        "Distance": 31.91
      },
      {
        "Code": "63122",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.577268000000,
        "Longitude": -90.424240000000,
        "County": "SAINT LOUIS",
        "Distance": 32.08
      },
      {
        "Code": "62285",
        "City": "SMITHTON",
        "State": "IL",
        "Latitude": 38.388428000000,
        "Longitude": -90.004930000000,
        "County": "SAINT CLAIR",
        "Distance": 32.34
      },
      {
        "Code": "63303",
        "City": "SAINT CHARLES",
        "State": "MO",
        "Latitude": 38.737380000000,
        "Longitude": -90.532513000000,
        "County": "SAINT CHARLES",
        "Distance": 32.57
      },
      {
        "Code": "62219",
        "City": "BECKEMEYER",
        "State": "IL",
        "Latitude": 38.605632000000,
        "Longitude": -89.435006000000,
        "County": "CLINTON",
        "Distance": 32.63
      },
      {
        "Code": "62015",
        "City": "BUTLER",
        "State": "IL",
        "Latitude": 39.210176000000,
        "Longitude": -89.541746000000,
        "County": "MONTGOMERY",
        "Distance": 32.83
      },
      {
        "Code": "63127",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.535697000000,
        "Longitude": -90.408094000000,
        "County": "SAINT LOUIS",
        "Distance": 33.22
      },
      {
        "Code": "62017",
        "City": "COFFEEN",
        "State": "IL",
        "Latitude": 39.075877000000,
        "Longitude": -89.392976000000,
        "County": "MONTGOMERY",
        "Distance": 33.55
      },
      {
        "Code": "62284",
        "City": "SMITHBORO",
        "State": "IL",
        "Latitude": 38.887838000000,
        "Longitude": -89.320072000000,
        "County": "BOND",
        "Distance": 33.94
      },
      {
        "Code": "62054",
        "City": "KANE",
        "State": "IL",
        "Latitude": 39.218414000000,
        "Longitude": -90.374370000000,
        "County": "GREENE",
        "Distance": 33.97
      },
      {
        "Code": "63017",
        "City": "CHESTERFIELD",
        "State": "MO",
        "Latitude": 38.672294000000,
        "Longitude": -90.533239000000,
        "County": "SAINT LOUIS",
        "Distance": 34.02
      },
      {
        "Code": "63151",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.458500000000,
        "Longitude": -90.323400000000,
        "County": "SAINT LOUIS",
        "Distance": 34.06
      },
      {
        "Code": "62081",
        "City": "ROCKBRIDGE",
        "State": "IL",
        "Latitude": 39.285160000000,
        "Longitude": -90.259556000000,
        "County": "GREENE",
        "Distance": 34.06
      },
      {
        "Code": "62036",
        "City": "GOLDEN EAGLE",
        "State": "IL",
        "Latitude": 38.895703000000,
        "Longitude": -90.579178000000,
        "County": "CALHOUN",
        "Distance": 34.14
      },
      {
        "Code": "62013",
        "City": "BRUSSELS",
        "State": "IL",
        "Latitude": 38.969238000000,
        "Longitude": -90.565792000000,
        "County": "CALHOUN",
        "Distance": 34.20
      },
      {
        "Code": "63128",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.490417000000,
        "Longitude": -90.380630000000,
        "County": "SAINT LOUIS",
        "Distance": 34.35
      },
      {
        "Code": "62218",
        "City": "BARTELSO",
        "State": "IL",
        "Latitude": 38.517536000000,
        "Longitude": -89.474973000000,
        "County": "CLINTON",
        "Distance": 34.59
      },
      {
        "Code": "62253",
        "City": "KEYESPORT",
        "State": "IL",
        "Latitude": 38.778554000000,
        "Longitude": -89.313166000000,
        "County": "CLINTON",
        "Distance": 34.67
      },
      {
        "Code": "63129",
        "City": "SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.448394000000,
        "Longitude": -90.325774000000,
        "County": "SAINT LOUIS",
        "Distance": 34.70
      },
      {
        "Code": "63099",
        "City": "FENTON",
        "State": "MO",
        "Latitude": 38.513100000000,
        "Longitude": -90.435500000000,
        "County": "SAINT LOUIS",
        "Distance": 35.37
      },
      {
        "Code": "62649",
        "City": "HETTICK",
        "State": "IL",
        "Latitude": 39.358379000000,
        "Longitude": -90.079940000000,
        "County": "MACOUPIN",
        "Distance": 35.43
      },
      {
        "Code": "62672",
        "City": "NILWOOD",
        "State": "IL",
        "Latitude": 39.349992000000,
        "Longitude": -89.743902000000,
        "County": "MACOUPIN",
        "Distance": 35.86
      },
      {
        "Code": "62560",
        "City": "RAYMOND",
        "State": "IL",
        "Latitude": 39.304893000000,
        "Longitude": -89.603788000000,
        "County": "MONTGOMERY",
        "Distance": 36.13
      },
      {
        "Code": "62282",
        "City": "SAINT LIBORY",
        "State": "IL",
        "Latitude": 38.362500000000,
        "Longitude": -89.709900000000,
        "County": "SAINT CLAIR",
        "Distance": 36.34
      },
      {
        "Code": "63006",
        "City": "CHESTERFIELD",
        "State": "MO",
        "Latitude": 38.663400000000,
        "Longitude": -90.576700000000,
        "County": "SAINT LOUIS",
        "Distance": 36.43
      },
      {
        "Code": "63024",
        "City": "BALLWIN",
        "State": "MO",
        "Latitude": 38.604600000000,
        "Longitude": -90.542400000000,
        "County": "SAINT LOUIS",
        "Distance": 36.46
      },
      {
        "Code": "62031",
        "City": "FIELDON",
        "State": "IL",
        "Latitude": 39.131398000000,
        "Longitude": -90.530781000000,
        "County": "JERSEY",
        "Distance": 36.70
      },
      {
        "Code": "63376",
        "City": "SAINT PETERS",
        "State": "MO",
        "Latitude": 38.795082000000,
        "Longitude": -90.626787000000,
        "County": "SAINT CHARLES",
        "Distance": 36.85
      },
      {
        "Code": "63088",
        "City": "VALLEY PARK",
        "State": "MO",
        "Latitude": 38.549899000000,
        "Longitude": -90.509941000000,
        "County": "SAINT LOUIS",
        "Distance": 36.95
      },
      {
        "Code": "63022",
        "City": "BALLWIN",
        "State": "MO",
        "Latitude": 38.595300000000,
        "Longitude": -90.546200000000,
        "County": "SAINT LOUIS",
        "Distance": 36.95
      },
      {
        "Code": "63026",
        "City": "FENTON",
        "State": "MO",
        "Latitude": 38.499952000000,
        "Longitude": -90.460954000000,
        "County": "SAINT LOUIS",
        "Distance": 37.00
      },
      {
        "Code": "62231",
        "City": "CARLYLE",
        "State": "IL",
        "Latitude": 38.628841000000,
        "Longitude": -89.323704000000,
        "County": "CLINTON",
        "Distance": 37.17
      },
      {
        "Code": "63011",
        "City": "BALLWIN",
        "State": "MO",
        "Latitude": 38.603679000000,
        "Longitude": -90.560380000000,
        "County": "SAINT LOUIS",
        "Distance": 37.35
      },
      {
        "Code": "63021",
        "City": "BALLWIN",
        "State": "MO",
        "Latitude": 38.564695000000,
        "Longitude": -90.534479000000,
        "County": "SAINT LOUIS",
        "Distance": 37.49
      },
      {
        "Code": "62262",
        "City": "MULBERRY GROVE",
        "State": "IL",
        "Latitude": 38.928877000000,
        "Longitude": -89.258710000000,
        "County": "BOND",
        "Distance": 37.51
      },
      {
        "Code": "62271",
        "City": "OKAWVILLE",
        "State": "IL",
        "Latitude": 38.431929000000,
        "Longitude": -89.506264000000,
        "County": "WASHINGTON",
        "Distance": 37.73
      },
      {
        "Code": "62044",
        "City": "GREENFIELD",
        "State": "IL",
        "Latitude": 39.369810000000,
        "Longitude": -90.189251000000,
        "County": "GREENE",
        "Distance": 37.79
      },
      {
        "Code": "62214",
        "City": "ADDIEVILLE",
        "State": "IL",
        "Latitude": 38.381732000000,
        "Longitude": -89.590754000000,
        "County": "WASHINGTON",
        "Distance": 37.95
      },
      {
        "Code": "62248",
        "City": "HECKER",
        "State": "IL",
        "Latitude": 38.304795000000,
        "Longitude": -89.993997000000,
        "County": "MONROE",
        "Distance": 38.04
      },
      {
        "Code": "62264",
        "City": "NEW ATHENS",
        "State": "IL",
        "Latitude": 38.302002000000,
        "Longitude": -89.925965000000,
        "County": "SAINT CLAIR",
        "Distance": 38.17
      },
      {
        "Code": "62257",
        "City": "MARISSA",
        "State": "IL",
        "Latitude": 38.322345000000,
        "Longitude": -89.745706000000,
        "County": "SAINT CLAIR",
        "Distance": 38.35
      },
      {
        "Code": "62051",
        "City": "IRVING",
        "State": "IL",
        "Latitude": 39.217142000000,
        "Longitude": -89.404756000000,
        "County": "MONTGOMERY",
        "Distance": 38.45
      },
      {
        "Code": "63010",
        "City": "ARNOLD",
        "State": "MO",
        "Latitude": 38.423443000000,
        "Longitude": -90.401639000000,
        "County": "JEFFERSON",
        "Distance": 38.58
      },
      {
        "Code": "62674",
        "City": "PALMYRA",
        "State": "IL",
        "Latitude": 39.412609000000,
        "Longitude": -90.010636000000,
        "County": "MACOUPIN",
        "Distance": 38.60
      },
      {
        "Code": "63338",
        "City": "COTTLEVILLE",
        "State": "MO",
        "Latitude": 38.746400000000,
        "Longitude": -90.653600000000,
        "County": "SAINT CHARLES",
        "Distance": 38.81
      },
      {
        "Code": "62255",
        "City": "LENZBURG",
        "State": "IL",
        "Latitude": 38.309434000000,
        "Longitude": -89.766912000000,
        "County": "SAINT CLAIR",
        "Distance": 38.90
      },
      {
        "Code": "62572",
        "City": "WAGGONER",
        "State": "IL",
        "Latitude": 39.372460000000,
        "Longitude": -89.654576000000,
        "County": "MONTGOMERY",
        "Distance": 39.02
      },
      {
        "Code": "62032",
        "City": "FILLMORE",
        "State": "IL",
        "Latitude": 39.122731000000,
        "Longitude": -89.307040000000,
        "County": "MONTGOMERY",
        "Distance": 39.14
      },
      {
        "Code": "62640",
        "City": "GIRARD",
        "State": "IL",
        "Latitude": 39.415699000000,
        "Longitude": -89.813085000000,
        "County": "MACOUPIN",
        "Distance": 39.34
      },
      {
        "Code": "62298",
        "City": "WATERLOO",
        "State": "IL",
        "Latitude": 38.307453000000,
        "Longitude": -90.154724000000,
        "County": "MONROE",
        "Distance": 39.40
      },
      {
        "Code": "62252",
        "City": "HUEY",
        "State": "IL",
        "Latitude": 38.603600000000,
        "Longitude": -89.291600000000,
        "County": "CLINTON",
        "Distance": 39.49
      },
      {
        "Code": "63304",
        "City": "SAINT CHARLES",
        "State": "MO",
        "Latitude": 38.710748000000,
        "Longitude": -90.666312000000,
        "County": "SAINT CHARLES",
        "Distance": 40.03
      },
      {
        "Code": "62098",
        "City": "WRIGHTS",
        "State": "IL",
        "Latitude": 39.375600000000,
        "Longitude": -90.294300000000,
        "County": "GREENE",
        "Distance": 40.44
      },
      {
        "Code": "62047",
        "City": "HARDIN",
        "State": "IL",
        "Latitude": 39.126046000000,
        "Longitude": -90.619435000000,
        "County": "CALHOUN",
        "Distance": 40.68
      },
      {
        "Code": "63366",
        "City": "O FALLON",
        "State": "MO",
        "Latitude": 38.853499000000,
        "Longitude": -90.702670000000,
        "County": "SAINT CHARLES",
        "Distance": 40.70
      },
      {
        "Code": "63052",
        "City": "IMPERIAL",
        "State": "MO",
        "Latitude": 38.395882000000,
        "Longitude": -90.422895000000,
        "County": "JEFFERSON",
        "Distance": 40.78
      },
      {
        "Code": "63053",
        "City": "KIMMSWICK",
        "State": "MO",
        "Latitude": 38.369900000000,
        "Longitude": -90.378600000000,
        "County": "JEFFERSON",
        "Distance": 40.78
      },
      {
        "Code": "62094",
        "City": "WITT",
        "State": "IL",
        "Latitude": 39.231908000000,
        "Longitude": -89.356636000000,
        "County": "MONTGOMERY",
        "Distance": 41.09
      },
      {
        "Code": "63049",
        "City": "HIGH RIDGE",
        "State": "MO",
        "Latitude": 38.474082000000,
        "Longitude": -90.537994000000,
        "County": "JEFFERSON",
        "Distance": 41.33
      },
      {
        "Code": "62016",
        "City": "CARROLLTON",
        "State": "IL",
        "Latitude": 39.325880000000,
        "Longitude": -90.429543000000,
        "County": "GREENE",
        "Distance": 41.52
      },
      {
        "Code": "63005",
        "City": "CHESTERFIELD",
        "State": "MO",
        "Latitude": 38.634836000000,
        "Longitude": -90.668873000000,
        "County": "SAINT LOUIS",
        "Distance": 41.79
      },
      {
        "Code": "63040",
        "City": "WILDWOOD",
        "State": "MO",
        "Latitude": 38.571760000000,
        "Longitude": -90.631890000000,
        "County": "SAINT LOUIS",
        "Distance": 41.80
      },
      {
        "Code": "62538",
        "City": "HARVEL",
        "State": "IL",
        "Latitude": 39.370684000000,
        "Longitude": -89.522402000000,
        "County": "MONTGOMERY",
        "Distance": 42.29
      },
      {
        "Code": "62006",
        "City": "BATCHTOWN",
        "State": "IL",
        "Latitude": 39.093772000000,
        "Longitude": -90.672540000000,
        "County": "CALHOUN",
        "Distance": 42.34
      },
      {
        "Code": "62250",
        "City": "HOFFMAN",
        "State": "IL",
        "Latitude": 38.541232000000,
        "Longitude": -89.263640000000,
        "County": "CLINTON",
        "Distance": 42.87
      },
      {
        "Code": "63038",
        "City": "WILDWOOD",
        "State": "MO",
        "Latitude": 38.587292000000,
        "Longitude": -90.666660000000,
        "County": "SAINT LOUIS",
        "Distance": 43.00
      },
      {
        "Code": "63057",
        "City": "LIGUORI",
        "State": "MO",
        "Latitude": 38.338300000000,
        "Longitude": -90.398900000000,
        "County": "JEFFERSON",
        "Distance": 43.20
      },
      {
        "Code": "62027",
        "City": "ELDRED",
        "State": "IL",
        "Latitude": 39.286778000000,
        "Longitude": -90.534212000000,
        "County": "GREENE",
        "Distance": 43.36
      },
      {
        "Code": "63368",
        "City": "O FALLON",
        "State": "MO",
        "Latitude": 38.747648000000,
        "Longitude": -90.742849000000,
        "County": "SAINT CHARLES",
        "Distance": 43.53
      },
      {
        "Code": "63369",
        "City": "OLD MONROE",
        "State": "MO",
        "Latitude": 38.934894000000,
        "Longitude": -90.752680000000,
        "County": "LINCOLN",
        "Distance": 43.72
      },
      {
        "Code": "63025",
        "City": "EUREKA",
        "State": "MO",
        "Latitude": 38.484194000000,
        "Longitude": -90.605708000000,
        "County": "SAINT LOUIS",
        "Distance": 43.81
      },
      {
        "Code": "62667",
        "City": "MODESTO",
        "State": "IL",
        "Latitude": 39.490102000000,
        "Longitude": -90.005592000000,
        "County": "MACOUPIN",
        "Distance": 43.91
      },
      {
        "Code": "62256",
        "City": "MAEYSTOWN",
        "State": "IL",
        "Latitude": 38.245900000000,
        "Longitude": -90.204700000000,
        "County": "MONROE",
        "Distance": 44.26
      },
      {
        "Code": "62533",
        "City": "FARMERSVILLE",
        "State": "IL",
        "Latitude": 39.444144000000,
        "Longitude": -89.616688000000,
        "County": "MONTGOMERY",
        "Distance": 44.36
      },
      {
        "Code": "62803",
        "City": "HOYLETON",
        "State": "IL",
        "Latitude": 38.454280000000,
        "Longitude": -89.295207000000,
        "County": "WASHINGTON",
        "Distance": 44.85
      },
      {
        "Code": "62065",
        "City": "MICHAEL",
        "State": "IL",
        "Latitude": 39.228740000000,
        "Longitude": -90.631496000000,
        "County": "CALHOUN",
        "Distance": 44.89
      },
      {
        "Code": "62278",
        "City": "RED BUD",
        "State": "IL",
        "Latitude": 38.203160000000,
        "Longitude": -90.008645000000,
        "County": "RANDOLPH",
        "Distance": 45.09
      },
      {
        "Code": "62295",
        "City": "VALMEYER",
        "State": "IL",
        "Latitude": 38.267460000000,
        "Longitude": -90.314810000000,
        "County": "MONROE",
        "Distance": 45.14
      },
      {
        "Code": "62683",
        "City": "SCOTTVILLE",
        "State": "IL",
        "Latitude": 39.499176000000,
        "Longitude": -90.110260000000,
        "County": "MACOUPIN",
        "Distance": 45.27
      },
      {
        "Code": "62011",
        "City": "BINGHAM",
        "State": "IL",
        "Latitude": 39.151958000000,
        "Longitude": -89.194904000000,
        "County": "FAYETTE",
        "Distance": 45.42
      },
      {
        "Code": "63012",
        "City": "BARNHART",
        "State": "MO",
        "Latitude": 38.326072000000,
        "Longitude": -90.449490000000,
        "County": "JEFFERSON",
        "Distance": 45.48
      },
      {
        "Code": "63389",
        "City": "WINFIELD",
        "State": "MO",
        "Latitude": 38.999347000000,
        "Longitude": -90.776990000000,
        "County": "LINCOLN",
        "Distance": 45.75
      },
      {
        "Code": "62075",
        "City": "NOKOMIS",
        "State": "IL",
        "Latitude": 39.294016000000,
        "Longitude": -89.306736000000,
        "County": "MONTGOMERY",
        "Distance": 45.89
      },
      {
        "Code": "63367",
        "City": "LAKE SAINT LOUIS",
        "State": "MO",
        "Latitude": 38.773430000000,
        "Longitude": -90.792024000000,
        "County": "SAINT CHARLES",
        "Distance": 45.89
      },
      {
        "Code": "62885",
        "City": "SHOBONIER",
        "State": "IL",
        "Latitude": 38.845947000000,
        "Longitude": -89.097027000000,
        "County": "FAYETTE",
        "Distance": 45.91
      },
      {
        "Code": "62092",
        "City": "WHITE HALL",
        "State": "IL",
        "Latitude": 39.404224000000,
        "Longitude": -90.442804000000,
        "County": "GREENE",
        "Distance": 46.27
      },
      {
        "Code": "62471",
        "City": "VANDALIA",
        "State": "IL",
        "Latitude": 38.876192000000,
        "Longitude": -89.088494000000,
        "County": "FAYETTE",
        "Distance": 46.38
      },
      {
        "Code": "62292",
        "City": "TILDEN",
        "State": "IL",
        "Latitude": 38.211780000000,
        "Longitude": -89.679617000000,
        "County": "RANDOLPH",
        "Distance": 46.70
      },
      {
        "Code": "63341",
        "City": "DEFIANCE",
        "State": "MO",
        "Latitude": 38.659500000000,
        "Longitude": -90.776217000000,
        "County": "SAINT CHARLES",
        "Distance": 46.71
      },
      {
        "Code": "62263",
        "City": "NASHVILLE",
        "State": "IL",
        "Latitude": 38.321258000000,
        "Longitude": -89.416429000000,
        "County": "WASHINGTON",
        "Distance": 46.74
      },
      {
        "Code": "62268",
        "City": "OAKDALE",
        "State": "IL",
        "Latitude": 38.264404000000,
        "Longitude": -89.523007000000,
        "County": "WASHINGTON",
        "Distance": 46.80
      },
      {
        "Code": "63051",
        "City": "HOUSE SPRINGS",
        "State": "MO",
        "Latitude": 38.399114000000,
        "Longitude": -90.591027000000,
        "County": "JEFFERSON",
        "Distance": 46.90
      },
      {
        "Code": "62690",
        "City": "VIRDEN",
        "State": "IL",
        "Latitude": 39.519130000000,
        "Longitude": -89.748730000000,
        "County": "MACOUPIN",
        "Distance": 47.04
      },
      {
        "Code": "63070",
        "City": "PEVELY",
        "State": "MO",
        "Latitude": 38.284686000000,
        "Longitude": -90.424264000000,
        "County": "JEFFERSON",
        "Distance": 47.04
      },
      {
        "Code": "62045",
        "City": "HAMBURG",
        "State": "IL",
        "Latitude": 39.214700000000,
        "Longitude": -90.692603000000,
        "County": "CALHOUN",
        "Distance": 47.11
      },
      {
        "Code": "63347",
        "City": "FOLEY",
        "State": "MO",
        "Latitude": 39.068791000000,
        "Longitude": -90.780048000000,
        "County": "LINCOLN",
        "Distance": 47.16
      },
      {
        "Code": "62217",
        "City": "BALDWIN",
        "State": "IL",
        "Latitude": 38.175160000000,
        "Longitude": -89.833195000000,
        "County": "RANDOLPH",
        "Distance": 47.31
      },
      {
        "Code": "62882",
        "City": "SANDOVAL",
        "State": "IL",
        "Latitude": 38.635726000000,
        "Longitude": -89.113751000000,
        "County": "MARION",
        "Distance": 47.55
      },
      {
        "Code": "62892",
        "City": "VERNON",
        "State": "IL",
        "Latitude": 38.800645000000,
        "Longitude": -89.068832000000,
        "County": "MARION",
        "Distance": 47.59
      },
      {
        "Code": "63048",
        "City": "HERCULANEUM",
        "State": "MO",
        "Latitude": 38.261521000000,
        "Longitude": -90.396292000000,
        "County": "JEFFERSON",
        "Distance": 47.60
      },
      {
        "Code": "63073",
        "City": "SAINT ALBANS",
        "State": "MO",
        "Latitude": 38.586600000000,
        "Longitude": -90.769200000000,
        "County": "FRANKLIN",
        "Distance": 48.08
      },
      {
        "Code": "62082",
        "City": "ROODHOUSE",
        "State": "IL",
        "Latitude": 39.495186000000,
        "Longitude": -90.308847000000,
        "County": "GREENE",
        "Distance": 48.21
      },
      {
        "Code": "62662",
        "City": "LOWDER",
        "State": "IL",
        "Latitude": 39.550800000000,
        "Longitude": -89.845600000000,
        "County": "SANGAMON",
        "Distance": 48.30
      },
      {
        "Code": "62689",
        "City": "THAYER",
        "State": "IL",
        "Latitude": 39.540501000000,
        "Longitude": -89.761408000000,
        "County": "SANGAMON",
        "Distance": 48.33
      },
      {
        "Code": "62244",
        "City": "FULTS",
        "State": "IL",
        "Latitude": 38.181062000000,
        "Longitude": -90.199298000000,
        "County": "MONROE",
        "Distance": 48.45
      },
      {
        "Code": "62801",
        "City": "CENTRALIA",
        "State": "IL",
        "Latitude": 38.527198000000,
        "Longitude": -89.153132000000,
        "County": "MARION",
        "Distance": 48.57
      },
      {
        "Code": "62875",
        "City": "PATOKA",
        "State": "IL",
        "Latitude": 38.747093000000,
        "Longitude": -89.057763000000,
        "County": "MARION",
        "Distance": 48.64
      },
      {
        "Code": "63385",
        "City": "WENTZVILLE",
        "State": "MO",
        "Latitude": 38.790097000000,
        "Longitude": -90.848366000000,
        "County": "SAINT CHARLES",
        "Distance": 48.78
      },
      {
        "Code": "63019",
        "City": "CRYSTAL CITY",
        "State": "MO",
        "Latitude": 38.229714000000,
        "Longitude": -90.374638000000,
        "County": "JEFFERSON",
        "Distance": 48.94
      },
      {
        "Code": "62080",
        "City": "RAMSEY",
        "State": "IL",
        "Latitude": 39.115390000000,
        "Longitude": -89.097564000000,
        "County": "FAYETTE",
        "Distance": 49.19
      },
      {
        "Code": "63346",
        "City": "FLINTHILL",
        "State": "MO",
        "Latitude": 38.862900000000,
        "Longitude": -90.860200000000,
        "County": "SAINT CHARLES",
        "Distance": 49.19
      },
      {
        "Code": "63069",
        "City": "PACIFIC",
        "State": "MO",
        "Latitude": 38.502084000000,
        "Longitude": -90.741844000000,
        "County": "FRANKLIN",
        "Distance": 49.34
      },
      {
        "Code": "62279",
        "City": "RENAULT",
        "State": "IL",
        "Latitude": 38.153323000000,
        "Longitude": -90.134082000000,
        "County": "MONROE",
        "Distance": 49.44
      },
      {
        "Code": "62546",
        "City": "MORRISONVILLE",
        "State": "IL",
        "Latitude": 39.434881000000,
        "Longitude": -89.405886000000,
        "County": "CHRISTIAN",
        "Distance": 49.48
      },
      {
        "Code": "62237",
        "City": "COULTERVILLE",
        "State": "IL",
        "Latitude": 38.201768000000,
        "Longitude": -89.564014000000,
        "County": "RANDOLPH",
        "Distance": 49.64
      },
      {
        "Code": "62053",
        "City": "KAMPSVILLE",
        "State": "IL",
        "Latitude": 39.331060000000,
        "Longitude": -90.645624000000,
        "County": "CALHOUN",
        "Distance": 49.84
      }
    ]
};

// ARI Return data
let returnData = {};
// Data from Database
let dataBaseData = {};
// Example comparison between API and database data
let comparedData = {};

