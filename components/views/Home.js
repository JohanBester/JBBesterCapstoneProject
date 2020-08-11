export default () => `
<main>
    <div class="addOrImage"></div>

    <div class="mainBody">
        <div class="pageIntro">
            <p>With the STIX Filipino Martial Arts Fun Finder app you can now find the FMA clubs, groups, schools and events you are looking for, by searching with a zip code! Enter a zip code and click the search button for quick easy results. To make your search more specific, choose to search for a club, group, school or event by clicking the option.</p>
        </div>

        <h1 class="secHead">Please enter your zip code to search</h1>

        <form id="searchForm">
            <div class="form-group">
            <label id="search-label" for="zipSearch">Zip Code <span class="required">*</span></label>
            <input type="text" name="zipSearch" id="zipSearch" class="form-control" placeholder="Enter Zip Code Here" required>
            <button type="submit" id="hpSearchBtn" class="btnStyled submit-button">Search</button>
            </div>

            <div id="options" class="form-group">
            <label>
                <input name="selectOptions" value="Club" type="radio" class="input-radio">Club</label>
            <label>
                <input name="selectOptions" value="Group" type="radio" class="input-radio">Group</label>
            <label>
                <input name="selectOptions" value="School" type="radio" class="input-radio">School</label>
            <label>
                <input name="selectOptions" value="Event" type="radio" class="input-radio">Event</label>
            <label>
                <input name="selectOptions" value="All" type="radio" class="input-radio" checked="">All</label>
            </div>
        </form>

        <div id="hpAddInfoButton" class="addInfo">
            <a href="addInfo" data-navigo>Click here to ADD a club, group, school or event</a>
        </div>

        <br/>
    </div>
</main>
`;