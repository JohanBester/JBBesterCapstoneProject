
//********************************************************
//**  Get the FMA JSON Data from the data source file  ***
//********************************************************
export default function DBJSON() {
    fetch('https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/FMAData.json')
    .then(response => response.json())
    .then(response => {
        const fmaDBdata = response; // save JSON data here...
        // console.log(response, fmaDBdata);
        return fmaDBdata;
        })
        .catch(err => {
            // What to do when the request fails
            alert("Error with the DBdata import. please try your search again.");
            console.log('The DBdata load request failed!');
            console.log('error', err);
        });
};
