import * as state from "../store";
import { capitalize } from "lodash";
import writeResults from "./writeResults";

//** FILTER according to search criteria
export default function filterData(zipAndRadiusData) {
  let filteredData = [];
  // check TYPE filter
  let typeData = [];
  if (state.Fmaresults.type != "" && state.Fmaresults.type !== "All") {
    // if previous filter results
    if (filteredData.length >= 1) {
      filteredData.forEach(dataItem4 => {
        if (capitalize(dataItem4.Type) === capitalize(state.Fmaresults.type)) {
          typeData.push(dataItem4);
        }
      });
    } else {
      // If no previous filter results
      zipAndRadiusData.forEach(dataItem4 => {
        if (capitalize(dataItem4.Type) === capitalize(state.Fmaresults.type)) {
          typeData.push(dataItem4);
        }
      });
    }
    if (typeData.length >= 1) {
      filteredData = typeData;
    }
  }
  // check STYLE filter
  let styleData = [];
  if (state.Fmaresults.style !== "" && state.Fmaresults.style !== "All") {
    // if previous filter results
    if (filteredData.length >= 1) {
      filteredData.forEach(dataItem3 => {
        if (
          capitalize(dataItem3.Style) === capitalize(state.Fmaresults.style)
        ) {
          styleData.push(dataItem3);
        }
      });
    } else {
      // if no previous results
      zipAndRadiusData.forEach(dataItem3 => {
        if (
          capitalize(dataItem3.Style) === capitalize(state.Fmaresults.style)
        ) {
          styleData.push(dataItem3);
        }
      });
    }
    if (styleData.length >= 1) {
      filteredData = styleData;
    }
  }
  // check STATE filter (disabled for now)
  // let stateData = [];
  // if (state.Fmaresults.stateCode != "state" || state.Fmaresults.stateCode != "") {
  // 	// if previous filter results
  //   if (filteredData.length >= 1) {
  //     filteredData.forEach((dataItem2) => {
  //       if (dataItem2.State === state.Fmaresults.stateText || dataItem2.State == state.Fmaresults.stateCode) {
  //         stateData.push(dataItem2);
  //       };
  //     });
  //   } else {
  //   	// if no previous filter results
  //     zipAndRadiusData.forEach((dataItem2) => {
  //       if (dataItem2.State == state.Fmaresults.stateCode || dataItem2.State === state.Fmaresults.stateText) {
  //         stateData.push(dataItem2);
  //       };
  //     });
  //   };
  //   // for testing
  //     alert("There was a state filter");
  //   if (stateData.length >= 1) {
  //     filteredData = stateData;
  //   };
  // };

  // Check Radius (disabled for now)
  // let radiusData = [];
  // if (state.Fmaresults.radius) {
  //   zipAndRadiusData.forEach(dataItem1 => {
  //     if (dataItem1.Distance === "Only a mile or so") {
  //       radiusData.push(dataItem1);
  //     }
  //     if (dataItem1.Distance <= state.Fmaresults.radius) {
  //       radiusData.push(dataItem1);
  //     }
  //   });
  //   if (radiusData.length >= 1) {
  //     filteredData = radiusData;
  //   }
  // }

  state.Fmaresults.filteredData = filteredData;
  writeResults(state.Fmaresults.filteredData);
}
