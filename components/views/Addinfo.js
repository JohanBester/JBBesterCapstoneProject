export default () => `
<main>
    <div class="addOrImage"></div>

    <div class="mainBody">
    <div class="pageIntro">
        <h1 class="introTitle">Please help to Add More FMA Info to the list</h1>
        <p>To alert us about new clubs, groups, schools, or events you think we should add to this list, please fill out all the fields in this form with the necessary information as indicated. Thanks!</p>
    </div>

    <form id="contact-form">

        <div class="form-group">
            <label id="name-label" for="name">Full Name <span class="required">*</span></label>
            <input type="text" name="name" id="name" class="form-control" placeholder="Enter your full name" required>
        </div>

        <div class="form-group">
            <label id="email-label" for="email">Email <span class="required">*</span></label>
            <input type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" class="form-control" placeholder="Enter your email address" required>
        </div>

        <div class="form-group">
            <label id="phone-label" for="phone">Phone <span class="required">*</span></label>
            <input type="tel" name="phone" id="phone" class="form-control" placeholder="Enter number 123-465-7980" required>
        </div>

        <div class="form-group">
            <label id="website-label" for="website">Website <span>(Optional)</span></label>
            <input type="url" name="website" id="website" pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?" class="form-control" placeholder="Enter a website address">
        </div>

        <div class="form-group">
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
            <p class="labelText" for="type">What information would you like to add? <span class="required">*</span></p>
            <select id="ddType" name="type" class="form-control ddDropdown" required>
                <option disabled selected value>What to add...</option>
                <option value="Club">Club</option>
                <option value="group">Group</option>
                <option value="school">School</option>
                <option value="event">Event</option>
            </select>
        </div>

        <div class="form-group">
            <p class="labelText" for="type">What is the name of the FMA venue or event to add? <span class="required">*</span></p>
            <label id="venueName-label" for="venueName">FMA Name <span class="required">*</span></label>
            <input type="text" name="venueName" id="venueName" class="form-control" placeholder="Enter the event or venue name" required>
        </div>

        <div class="form-group">
            <p class="labelText" for="activityAddress">Please enter the address details for the new FMA venue <span class="required">*</span></p>
            <div id="activityAddress">
                <label id="address-label" for="address">Address <span class="required">*</span></label>
                <input type="text" name="address" id="address" class="form-control" placeholder="Enter an Address" required><br />
                <label id="state-label" for="state">State <span class="required">*</span></label>
                <select id="state" name="state" class="form-control ddDropdown" required>
                <option disabled selected value>Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
                </select><br />
                <label id="zipcode-label" for="zipcode">Zip Code <span class="required">*</span></label>
                <input type="number" name="zipcode" id="zipcode" pattern="(\d{5}([\-]\d{4})?)" class="form-control" placeholder="Enter a Zip Code" required>
            </div>
        </div>

        <div class="form-group">
            <p class="labelText">Enter additional information you want to suggest here. <span class="required">*</span></p>
            <textarea id="comments" class="input-textarea" name="comment" placeholder="Enter all details here here..." required></textarea>
        </div>

        <div class="button-group">
            <button type="reset" id="clear" class="btnStyled submit-button" onclick="form.reset()">Clear</button>
            <button type="submit" id="send" class="btnStyled submit-button">Send Info</button>
        </div>

        <div>
            <p id="form-status"></p>
        </div>

    </form>
    <br/>

    <div id="hpAddInfoButton" class="addInfo" style="display: none;"></div>

    </div>
</main>
`;
