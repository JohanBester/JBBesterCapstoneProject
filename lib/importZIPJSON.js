//***  Get TEST ZIP Data from the JSON file ***
import * as state from "../store";

export default function importZIPJSON() {
  state.Fmaresults.tempZipData = [];
  fetch(
    "https://raw.githubusercontent.com/JohanBester/JBBesterCapstoneProject/master/ZIPdata.json"
  )
    .then(response => response.json())
    .then(response => {
      state.Fmaresults.tempZipData = response;
    })
    .catch(err => {
      console.log(
        "The ZIPdata load request failed! Error with the ZIPdata import LINE 180. please try your search again."
      );
      console.log("error", err);
    });
}
