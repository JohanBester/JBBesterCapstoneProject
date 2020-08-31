import * as state from "../store";
import filterData from "./filterData";
import writeResults from "./writeResults";

//** functions to COMPARE Data
export default function compareTheData(DBdata, zipData) {
  state.Fmaresults.comparedData = [];
  zipData.DataList.forEach(zipItem => {
    DBdata.forEach(dbItem => {
      if (zipItem.Code === dbItem.ZipCode) {
        let tempItem = dbItem;
        tempItem.Distance = zipItem.Distance; // Pull distance from target into data collection
        if (!tempItem.Distance || tempItem.Distance == "0") {
          tempItem.Distance = "Only a mile or so";
        }
        state.Fmaresults.comparedData.push(tempItem);
      }
    });
  });
  // console.log("compared data = ", state.Fmaresults.comparedData);
  if (state.Fmaresults.filter) {
    // alert("Going to filter the data");
    filterData(state.Fmaresults.comparedData);
  } else {
    // alert("Going to Print the data");
    writeResults(state.Fmaresults.comparedData);
  }
}
