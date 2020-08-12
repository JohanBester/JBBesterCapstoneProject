export default () => `
<div class="addOrImage" style="display: none;"></div>

<main id="fmaSearchPage">
    <div class="pageIntro">
        <p>Refine your search results by entering a zip code, selecting additional options from the search bar, and then clicking the search button.</p>
    </div>

    <form id="searchBar" class="searchBar">
        <div>
            <input type="text" name="Zip" id="zipSearch" class="sbField" pattern="(\d{5}([\-]\d{4})?)" placeholder="Zip" required>
        </div>
        <div>
            <select id="stateSearch" name="state" class="sbField">
            <option disabled selected value>State</option>
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
            </select>
        </div>
        <div>
            <select id="radiusSearch" name="radius" class="sbField" required>
            <option disabled selected value>Radius</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
        </div>
        <div>
            <select id="typeSearch" name="type" class="sbField">
            <option disabled selected value>Type</option>
            <option value="Club">Club</option>
            <option value="Group">Group</option>
            <option value="School">School</option>
            <option value="Event">Event</option>
            <option value="All">All</option>
            </select>
        </div>
        <div>
            <select id="styleSearch" name="style" class="sbField">
            <option disabled selected value>Style</option>
            <option value="Arnis">Arnis</option>
            <option value="Eskrima">Escrima</option>
            <option value="Kali">Kali</option>
            <option value="All">All</option>
            </select>
        </div>
        <div >
            <button type="submit" id="btnFilterSearch" class="btnStyled">Search</button>
        </div>
    </form>

    <div id="container" class="container"></div>
    
    <div id="hpAddInfoButton" class="addInfo" style="display: none;"></div>
</main>
`;
