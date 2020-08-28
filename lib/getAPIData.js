import axios from "axios";
import env from "env";
import * as state from "../store";

//** GET Zip Code Data from API

export default function getAPIData() {
  state.Fmaresults.returnedAPIdata = [];
  let zipCode = state.Fmaresults.zipCode;
  let radius = state.Fmaresults.radius;
  let APIkey = process.env.ZIP_CODES_API_KEY;

  axios
    .get(
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=${APIkey}`
    )
    .then(results => {
      state.Fmaresults.returnedAPIdata = results.data;
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
