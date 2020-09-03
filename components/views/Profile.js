export default st => `
  <main>
  <div class="addOrImage" style="display: none"></div>

  <div class="profileOptions center">
  <div id="logState">
    <h4>Currently Logged In</h3>
  </div>
  <div class="center">
    <div>
      <p><b>Full Name: </b><br />
        <span id="full-name">${st.firstname} ${st.lastname}</span>
      </p>
      <p><b>User Name: </b><br />
        <span id="user-name">${st.username}</span>
      </p>
      <p><b>Email: </b><br />
        <span id="user-email">${st.useremail}</span>
      </p>
    </div>
  </div>
  <div class="center">
    <button type="submit" id="logButton" class="btnStyled submit-button">Logout</button>
  </div>

</div>

    <div id="templatePage" class="mainBody">
      <div class="pageIntro">
        <h1>User Profile Page</h1>
      </div>

      <p class="secHead"> To manage any of your information, just click on alink below.</p>
      <br/>

      <div>
        <ul>
          <li>
            <a href="#">Update your user profile</a><br /><br />
          </li>
          <li>
            <a href="#">Change you password</a><br /><br />
          </li>
          <li>
            <a href="#">Modify your venue or event listing</a><br /><br />
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
