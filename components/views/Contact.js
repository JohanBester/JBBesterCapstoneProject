
export default () => `
<main>
    <div class="addOrImage"></div>

    <div class="mainBody">
        <div class="pageIntro">
            <h1 class="introTitle center">Contact Us</h1>
        </div>      
        <p>We welcome feed-back and contact from folks who use our app. You are encouraged to let us know if some information is wrong or outdated. Send us the new updated info and we'll get that on the list as well. Any other comments are also welcomed! Thanks!</p>

        <form id="contact-form" action="https://formspree.io/xdowpwkb" method="POST">
            <div class="form-group right">
                <label id="name-label" for="name">Full Name <span class="required">*</span></label>
                <input type="text" name="name" id="name" class="form-control" placeholder="Enter your full name" required>
            </div>
            
            <div class="form-group right">
                <label id="email-label" for="email">Email <span class="required">*</span></label>
                <input type="email" name="email" id="email" class="form-control" placeholder="Enter your email address" required>
            </div>
            
            <div class="form-group right">
                <label id="phone-label" for="phone">Phone (Optional)&nbsp;</label>
                <input type="tel" name="phone" id="phone" class="form-control" placeholder="Enter number 123-465-7980">
            </div>
            
            <div class="form-group right">
                <p class="labelText" for="role">Which best describes your role? (Optional)</p>
                <select id="ddRole" name="role" class="form-control ddDropdown">
                    <option disabled selected value>Select your current role</option>
                    <option value="student">FMA Student</option>
                    <option value="instructor">FMA Instructor</option>         
                    <option value="Organizer">Event Organizer</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <p class="labelText">Enter your comments or suggestions here. Thanks! <span class="required">*</span></p>
                <textarea type="text" id="comments" class="input-textarea" name="comment" placeholder="Enter your comment here..." required></textarea>
            </div>

            <div class="form-group">
                <button type="reset" id="clear" class="btnStyled submit-button" onclick="form.reset()">Clear</button>
                <button type="submit" id="send" class="btnStyled submit-button">Send Message</button>
            </div>
        </form>
        <br/>

	    <div class="center">
			<a href="Fmaresults"  data-navigo id="search" class="btnStyled submit-button">Go To Search Now</a>
		</div>
        <br />

        <div id="hpAddInfoButton" class="addInfo">
            <a href="/AddInfo" data-navigo>Click here to ADD FMA Info</a>
        </div>
        <br/>
    </div>
</main>
`;
