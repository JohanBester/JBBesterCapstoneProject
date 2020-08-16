import * as state from "../store";
import axios from "axios";
import { compareTheData } from "../index";
//** GET Zip Code Data from API (this works)
function getAPIData() {
  //** IMPORTANT! Add API key for demo day !!
  state.Params.returnedAPIdata = [];
  zipCode = state.Params.zipCode;
  radius = state.Params.radius;
  axios
    .get(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=xxxxxxxxxxxxxxxxxxxxxxxxxxx`)
    .then(results => {
      state.Params.returnedAPIdata = results.data;
      // console.log(results.data); // for testing
      compareTheData(state.Params.fmaDBdata, state.Params.returnedAPIdata);
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
