//----------signup-form-------------/
function listenForSignup(st) {
  if (st.view === "Signup") {
    document.querySelector("#signup-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove submit button so it's not included
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let email = inputs[0];
      let password = inputs[1];
      let name = inputs[2];
      let location = inputs[3];
      let profilePicture = inputs[4];
      let hobbies = inputs[5];
      let instagram = inputs[6];
      let youtube = inputs[7];
      let pintrest = inputs[8];
      let facebook = inputs[9];
      let otherSite = inputs[10];
      let userWants = inputs[11];

      //create user in firebase
      auth.createUserWithEmailAndPassword(email, password).then(response => {
        //add user to state and database
        addUserToStateAndDB(
          email,
          password,
          name,
          location,
          profilePicture,
          hobbies,
          instagram,
          youtube,
          pintrest,
          facebook,
          otherSite,
          userWants
        );
        render(state.Profile);
        router.navigate("/Profile");
        populateProfile();
      });
    });
  }
}

//--------add user to state and db-----------/
function addUserToStateAndDB(
  email,
  password,
  name,
  location,
  profilePicture,
  hobbies,
  instagram,
  youtube,
  pintrest,
  facebook,
  otherSite,
  userWants
) {
  state.User.email = email;
  state.User.name = name;
  state.User.location = location;
  state.User.profilePicture = profilePicture;
  state.User.hobbies = hobbies;
  state.User.instagram = instagram;
  state.User.youtube = youtube;
  state.User.pintrest = pintrest;
  state.User.facebook = facebook;
  state.User.otherSite = otherSite;
  state.User.userWants = userWants;
  state.User.loggedIn = true;

  db.collection("users").add({
    email: email,
    signedIn: true,
    password: password,
    name: name,
    location: location,
    profilePicture: profilePicture,
    hobbies: hobbies,
    instagram: instagram,
    youtube: youtube,
    pintrest: pintrest,
    facebook: facebook,
    otherSite: otherSite,
    userWants: userWants,
    loggedIn: true
  });
}
