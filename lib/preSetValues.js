
export default function preSetValues() {
    document.getElementById("zipSearch").value = Params.zipCode;
        alert("zipCode = " + Params.zipCode);  // for testing

    document.querySelector("#radiusSearch").value = Params.radius;
        alert("radius = " + Params.radius);  // for testing

    let typeField = document.querySelector("#typeSearch");
    if (Params.type == "All") {
    typeField.text = "Type";
    } else {
    typeField.value = Params.type;
    };
        alert("type = " + Params.type);  // for testing

    let styleField = document.querySelector("#styleSearch");
    if (Params.style == "All") {
    styleField.text = "Style";
    } else {
    styleField.value = Params.style;
    };
        alert("style = " + Params.style);  // for testing

    let stateField = document.querySelector("#stateSearch");
    if (Params.stateCode == "All") {
        stateField.text = "State";
    } else {
        stateField.value = Params.stateCode;
    };
        alert("The state = " + Params.stateCode, Params.stateText);
};
