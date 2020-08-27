
export default () => `
<main>
    <div class="addOrImage"></div>

    <div id="resetpassword" class="mainBody">
    <div class="pageIntro">
        <h1>Request To Reset Your Password</h1>
    </div>

    <p class="center">
        If you have forgotten your password and need to reset it, please enter your user name OR email address below.<br />
        A message will be sent to your email address with a link to reset your password.
    </p>

    <form id="login-form" action="" method="POST">

        <div class="form-group right">
            <label id="name-label" for="username">User Name </label>
            <input type="text" name="name" id="username" class="form-control" placeholder="Enter your user name">
        </div>
        
        <div class="form-group right">
            <label id="email-label" for="email">Email </label>
            <input type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" class="form-control" placeholder="Enter your email address">
        </div>

        <div class="form-group">
            <button type="reset" id="clear" class="btnStyled submit-button" onclick="form.reset()">Clear</button>
            <button type="submit" id="reset" class="btnStyled submit-button">Send</button>
        </div>
    </form>

    <br/>

    <div id="hpAddInfoButton" class="addInfo" style="display: none;"></div>
    <br/>
    <br/>

    </div>
</main>

`;
