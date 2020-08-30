export default st => `
  <main>
  <div class="profileOptions center">
  <div id="logState">
    <h4>Currently Logged In</h3>
  </div>
  <div class="center">
    <div>
      <p><b>User Name: </b><br />
        ${st.username}
      </p>
    </div>
  </div>
  <div class="center">
      <button id="log-out" type="submit" class="btnStyled submit-button">Logout</button>
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
