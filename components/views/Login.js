
export default () => `
<main>
    <div class="addOrImage"></div>

    <div id="loginPage" class="mainBody">
    <div class="pageIntro">
        <h1>User Login Page</h1>
    </div>

    <p class="center">If you have a user account please fill in your user name and password to login.<br />If you do not have an account and would like to register an account, please click the <b>"Register a New User Account"</b> link below.</p>

    <form id="login-form" action="" method="POST">
        <div class="form-group right">
            <label id="name-label" for="username">User Name <span class="required">*</span></label>
            <input type="text" name="name" id="username" class="form-control" placeholder="Enter your user name" required>
        </div>
        
        <div class="form-group right">
            <label id="password-label" for="password">Password <span class="required">*</span></label>
            <input type="password" name="password" id="password" class="form-control" placeholder="Enter your password" required>
        </div>
        
        <div class="form-group">
            <button type="reset" id="clear" class="btnStyled submit-button" onclick="form.reset()">Clear</button>
            <button type="submit" id="login" class="btnStyled submit-button">Login</button>
        </div>
    </form>

    <br/>

    <div id="registerButton" class="register center">
        <a href="Register.html">Click here to Register a New User Account</a> 
    </div>

    <br/>

    <div id="hpAddInfoButton" class="addInfo" style="display: none;"></div>
    <br/>
    <br/>

    </div>
</main>
`;