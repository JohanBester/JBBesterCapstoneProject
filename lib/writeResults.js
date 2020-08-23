//** write Data to result page
//****************************
export default function writeResults(printableData) {
let container = document.querySelector("#container");

let htmlString = "";

  if (printableData.length >= 1) {
		let i = 0;
		printableData.forEach((element) => {
			i++;
      htmlString += `<div>
        <b>#${i} ${element.Name}</b><br/>
        &nbsp; ${element.Address},
        &nbsp; ${element.State}, ${element.ZipCode}<br />
        &nbsp; Phone : ${element.Phone}<br />
        &nbsp; Email : ${element.Email}<br />
        &nbsp; Web URL : ${element["Web URL"]}<br />
        &nbsp; Type : ${element.Type} &nbsp; &nbsp; Style : ${element.Style}<br />
        &nbsp; Distance : ${element.Distance}<br />
        </div>`;
        });
        container.innerHTML = htmlString;
	} else {
    console.log("Error in writeResults function");
		alert("Nothing to print");
	  return `
	    <div>
	        There seems to be no data for this search. We are very sorry. Please try a different search combination. <br />
	      </div>
	  `;
	};
};
