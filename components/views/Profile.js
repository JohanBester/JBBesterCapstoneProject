export default st => `
  <main>
  <div class="addOrImage" style="display: none"></div>

  <div class="profileOptions center">
    <div class="center">
      <button type="submit" id="logoutButton" class="btnStyled submit-button">Logout</button>
    </div>
    <div id="logState">
      <h4>Currently Logged In</h3>
    </div>
    <div class="center">
      <div id="logedinInfo">
        <p><b>Full Name: </b>&nbsp;
          <span id="full-name">${st.firstname} ${st.lastname}</span>
        </p>
        <p><b>User Name: </b>&nbsp;
          <span id="user-name">${st.username}</span>
        </p>
        <p><b>Email: </b>&nbsp;
          <span id="user-email">${st.useremail}</span>
        </p>
      </div>
    </div>
  </div>

    <div id="templatePage" class="mainBody">
      <div class="pageIntro">
        <h1>User Profile Page</h1>
      </div>

      <p class="secHead"> To manage any of your information, just click on a link below.</p>
      <br/>

      <div id="profilePageLinks">
        <ul>
          <li>
            <a href="#">Update your user profile</a>
          </li>
          <li>
            <a href="#">Change you password</a>
          </li>
          <li>
            <a href="#">Modify your venue or event listing</a>
          </li>
        </ul>
      </div>
      <br/>

      <div id="hpAddInfoButton" class="addInfo"></div>
      <br/>
      <br/>

    </div>
  </main>
`;
