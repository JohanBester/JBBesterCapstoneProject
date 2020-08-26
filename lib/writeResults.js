
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
        ${element.Address},
        ${element.State}, ${element.ZipCode}<br />
        Phone : ${element.Phone}<br />
        Email : ${element.Email}<br />
        Web URL : ${element["Web URL"]}<br />
        Type : ${element.Type}<br />
        Style : ${element.Style}<br />
        Distance : ${element.Distance}<br />
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
