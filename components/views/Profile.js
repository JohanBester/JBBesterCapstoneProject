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
        ${st.firstname} ${st.lastname}
      </p>
      <p><b>User Name: </b><br />
        ${st.username}
      </p>
      <p><b>Email: </b><br />
        ${st.useremail}
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

      <h2 class="secHead"> The profile page content will be placed here</h2>

      <br/>

      <div id="hpAddInfoButton" class="addInfo"></div>

      <br/>
      <br/>

    </div>
  </main>
`;
