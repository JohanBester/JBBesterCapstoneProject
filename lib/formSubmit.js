import axios from "axios";
import * as state from "../store";

export default function formSubmit(st) {
  const form = document.querySelector("#contact-form");
  let buttons = document.querySelector(".button-group");
  let status = document.querySelector("#form-status");
  let results = "";
  let data = new FormData(form);
  let pageUrl = "";

  if (st.page === "Contact") {
    // action="https://formspree.io/xdowpwkb" target="_blank" method="POST"
    pageUrl = "https://formspree.io/xdowpwkb";
  } else if (st.page === "Addinfo") {
    // action="https://formspree.io/mjvajbql" target="_blank" method="POST"
    pageUrl = "https://formspree.io/mjvajbql";
  }
  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
    buttons.style = "display: none";
    status.innerHTML =
      "Thanks! Your message has been sent successfully. We will get back in touch with you within 1 - 2 business days.";
  }
  function error() {
    status.innerHTML =
      "Oops! There seems to be a problem with this form submission. Kindly please try that again please.";
  }

  axios
    .post(pageUrl, data)
    .then(function(response) {
      console.log(response);
      results = JSON.stringify(response.data);
      if (response.status === 200) {
        return success();
      } else {
        return error();
      }
    })
    .catch(function(error) {
      // What to do when the request fails
      alert(
        "There seems to be a problem with this form submission. Kindly please try that again."
      );
      console.log("The Axios form Post failed!");
      console.log("Error", error);
    });
}
