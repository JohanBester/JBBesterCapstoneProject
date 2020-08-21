import axios from "axios";

//** GET Zip Code Data from API (this works)
export default function getAPIData() {
  //** IMPORTANT! Add API key for demo day !!
  state.Fmaresults.returnedAPIdata = [];
  zipCode = state.Fmaresults.zipCode;
  radius = state.Fmaresults.radius;
  let APIkey = "XXXXXXXXXXXXXXXX";

  axios
    .get(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=${APIkey}`)
    .then(results => {
        state.Fmaresults.returnedAPIdata = results.data;
      }
    )
    .catch(err => {
      // What to do when the request fails
      alert("There seems to be a problem with this search. Kindly please try that again.");
      console.log('The Axios API request failed!');
      console.log('Error', err);
    }
    );
}
