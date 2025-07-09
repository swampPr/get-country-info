//NOTE: Necessary variables that will hold specific country information
const countrySelect = document.getElementById('country-select');
const getAll = document.getElementById('get-all');
const countryName = document.getElementById('country-name');
const countryOfficial = document.getElementById('country-name-official');
const continentsHeading = document.getElementById('continents-heading');
const continentsList = document.getElementById('continents');
const capital = document.getElementById('capital');
const languagesList = document.getElementById('languages-list');
const languagesHeading = document.getElementById('languages-heading');
const population = document.getElementById('population');
const carSide = document.getElementById('car-side');
const currency = document.getElementById('currency');
const timezonesHeading = document.getElementById('timezones-heading');
const timezonesList = document.getElementById('timezones');
const region = document.getElementById('region');
const landlocked = document.getElementById('landlocked-bool');
const landlockedHeading = document.getElementById('landlocked-heading');
const landlockedLabel = document.getElementById('landlock-label');
const flagImg = document.getElementById('flag-img');
const coatOfArms = document.getElementById('coat-img');

let countryList = null;

//TODO: ADD FUNCTIONS AND ENDPOINTS FOR GETTING SPECIFIC INFORMATION

//NOTE: When site loads and app.js is loaaded, it will get the list of countries from the /list endpoint and add it to the select tag
async function getCountries() {
    try {
        //NOTE: Fetch for the list of countries included in the iso-3166-1 package
        const response = await fetch(`/list`, {
            headers: {
                Accept: 'application/json'
            }
        });
        const data = await response.json();
        countryList = data;

        //NOTE: Adding all the countries to different options tags and making their values be the countries CCA2 alpha code

        let countries = '<option value="" disabled selected hidden>Pick a country</option>';
        for (let country in countryList) {
            countries += `<option value=${country}>${countryList[country]}</option>`;
        }
        countrySelect.innerHTML = countries;

        //NOTE: Setting up Tom-Select for smoother selecting experience
        new TomSelect('#country-select', {
            maxItems: 1,
            placeholder: 'Pick a country',
            sortField: {
                field: 'text',
                direction: 'asc'
            }
        });
    } catch (err) {
        console.log('FETCH FAILED', err);
    }
}

getCountries();

//NOTE: After getting the countries from the ISO package, this function will deal with getting the country info after the user selects their country
async function getCountryInfo(countryCode) {
    try {
        const response = await fetch(`/country/${countryCode}`, {
            headers: {
                Accept: 'application/json'
            }
        });

        const countryInfo = await response.json();
        return countryInfo;
    } catch (err) {
        console.log('FETCH FAILED', err);
    }
}

//NOTE: Render the country information to the site
function render(countryInfo) {
    countryName.textContent = countryInfo.name[0];
    countryOfficial.textContent = countryInfo.name[1] === countryInfo.name[0] ? null : countryInfo.name[1];

    let continentsListEls = '';
    countryInfo.continents.forEach((continent) => {
        continentsListEls += `<li>${continent}</li>`;
    });
    continentsHeading.textContent = 'Continents: ';
    continentsList.innerHTML = continentsListEls;

    capital.textContent = `Capital: ${countryInfo.capital[0]}`;

    let languagesListEls = '';
    countryInfo.languages.forEach((language) => {
        languagesListEls += `<li>${language}</li>`;
    });
    languagesHeading.textContent = 'Languages: ';
    languagesList.innerHTML = languagesListEls;

    population.innerHTML = `Population: approximately <b>${countryInfo.population.toLocaleString()}</b> persons`;
    carSide.innerHTML = `Drives on the <b>${countryInfo.car.side}</b> side of the road`;
    currency.textContent = `Currency: ${countryInfo.currency.name} ( ${countryInfo.currency.code} ) `;

    let timezonesListEls = '';
    countryInfo.timezones.forEach((timezone) => {
        timezonesListEls += `<li>${timezone}</li>`;
    });
    timezonesHeading.textContent = 'Timezones: ';
    timezonesList.innerHTML = timezonesListEls;

    region.textContent = `Region: ${countryInfo.region}`;

    landlockedHeading.textContent = 'Landlocked: ';
    landlocked.textContent = `${countryInfo.landlocked ? 'This country is landlocked!' : 'This country is NOT landlocked!'}`;
    landlockedLabel.style.display = 'inline-block';

    flagImg.src = countryInfo.flag.png;
    flagImg.alt = countryInfo.flag.alt;

    coatOfArms.src = countryInfo.coatOfArms;
    coatOfArms.alt = 'No Coat of Arms found!';

    coatOfArms.style.width = '300px';
    coatOfArms.style.height = 'auto';
}

//NOTE: Check for the user submitting their country name and if so then get all the information for the specified country
getAll.addEventListener('click', async () => {
    const countryInfo = await getCountryInfo(countrySelect.value);
    render(countryInfo);
});
