//********************************************************
//**  Get the ZIP JSON Data from the data source file  ***
//********************************************************
export default function ZIPJSON() {
  fetch('https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/ZIPdata.json')
    .then(response => response.json())
    .then(response => {
        const tempZipData = response;  // save JSON data here...
        // console.log(response, fmaDBdata);
        return tempZipData;
    })
    .catch(err => {
        // What to do when the request fails
        alert("Error with the ZIPdata import. Please try your search again.");
        console.log('The ZIPdata load request failed!');
        console.log('error', err);
    });
};
