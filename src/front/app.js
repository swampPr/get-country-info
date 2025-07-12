//NOTE: Necessary variables that will hold specific country information
const countrySelect = document.getElementById('country-select');
const getAll = document.getElementById('get-all');
const countryName = document.getElementById('country-name');
const countryExtrasHeading = document.getElementById('country-extras-heading');
const countryExtrasList = document.getElementById('extras-list');
const continentsHeading = document.getElementById('continents-heading');
const continentsList = document.getElementById('continents');
const capital = document.getElementById('capital');
const languagesList = document.getElementById('languages-list');
const languagesHeading = document.getElementById('languages-heading');
const population = document.getElementById('population');
const callingCode = document.getElementById('calling-code');
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

//TODO: TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
//TODO: ADD ERROR HANDLING FOR IF INFO IS NOT FOUND
//TODO: FIND A WAY TO CLEAN UP THE DISGUSTING LIST OF CONSTANTS ABOVE, PERHAPS SOME DON'T NEED TO BE STORED IN VARIABLES.
//TODO: CHECK DOCUMENTATION, CHECK CODE, OPTIMIZE, AND PUSH TO GITHUB

//NOTE: When site loads and app.js is loaded, it will get the list of countries from the /list endpoint and add it to the select tag
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

//NOTE: This function will clear the elements information so that new information can be rendered.
function clearInfo() {
    countryName.textContent = null;
    countryExtrasHeading.textContent = null;
    countryExtrasList.innerHTML = null;
    continentsList.innerHTML = null;
    continentsHeading.textContent = null;

    capital.textContent = null;
    languagesList.innerHTML = null;
    languagesHeading.textContent = null;
    population.textContent = null;
    callingCode.textContent = null;
    carSide.textContent = null;
    currency.textContent = null;
    timezonesHeading.textContent = null;
    timezonesList.innerHTML = null;
    region.textContent = null;
    landlocked.textContent = null;

    landlockedHeading.textContent = null;
    landlockedLabel.textContent = null;
    flagImg.src = '';
    flagImg.alt = '';
    document.getElementById('extras-img').src = '';
    document.getElementById('extras-img').alt = '';
    coatOfArms.src = '';
    coatOfArms.alt = '';
}

//NOTE: Information fetchers
async function getAllCountryInfo(countryCode) {
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

async function getCapital(countryCode) {
    try {
        const response = await fetch(`/capital/${countryCode}`, {
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

async function getCallCode(countryCode) {
    try {
        const response = await fetch(`/callcode/${countryCode}`, {
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

async function getFlag(countryCode) {
    try {
        const response = await fetch(`/flag/${countryCode}`, {
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

async function getCoat(countryCode) {
    try {
        const response = await fetch(`/coat/${countryCode}`, {
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

async function getCurrency(countryCode) {
    try {
        const response = await fetch(`/currency/${countryCode}`, {
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

async function getTimezone(countryCode) {
    try {
        const response = await fetch(`/timezone/${countryCode}`, {
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

async function getContinents(countryCode) {
    try {
        const response = await fetch(`/continent/${countryCode}`, {
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

async function getPopulation(countryCode) {
    try {
        const response = await fetch(`/population/${countryCode}`, {
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

//NOTE: Information renderers
function renderCapital(countryInfo) {
    const { name } = countryInfo;
    const { capital } = countryInfo;

    countryName.textContent = name;
    countryExtrasHeading.textContent = `Capital: ${capital}`;
}

function renderContinents(countryInfo) {
    const { name } = countryInfo;
    const { continents } = countryInfo;

    countryName.textContent = name;

    let continentsListEls = '';
    continents.forEach((continent) => {
        continentsListEls += `<li>${continent}</li>`;
    });
    countryExtrasHeading.textContent = `Continents`;
    countryExtrasList.innerHTML = continentsListEls;
}

function renderPopulation(countryInfo) {
    const { name } = countryInfo;
    const { population } = countryInfo;

    countryName.textContent = name;

    countryExtrasHeading.innerHTML = `Population: <b>${population.toLocaleString()}</b>`;
}

function renderCurrency(countryInfo) {
    const { name } = countryInfo;
    const { currency } = countryInfo;

    countryName.textContent = name;
    console.log(countryInfo);

    countryExtrasHeading.textContent = `Currency: ${countryInfo.currency.name} ( ${currency.code})`;
    return;
}

function renderTimezones(countryInfo) {
    const { name } = countryInfo;
    const { timezones } = countryInfo;

    countryName.textContent = name;

    let timezonesListEls = '';
    timezones.forEach((timezone) => {
        timezonesListEls += `<li>${timezone}</li>`;
    });
    countryExtrasHeading.textContent = 'Timezones: ';
    countryExtrasList.innerHTML = timezonesListEls;
}

function renderCallingCode(countryInfo) {
    const { name } = countryInfo;
    const { callCode } = countryInfo;
    if (!callingCode) countryExtrasHeading.innerHTML = `No calling code found!`;

    countryName.textContent = name;
    countryExtrasHeading.innerHTML = `Dial Code: +${callCode}`;
}

function renderFlag(countryInfo) {
    const { name } = countryInfo;
    const { flag } = countryInfo;

    countryName.textContent = name;
    countryExtrasHeading.textContent = `Flag: `;

    document.getElementById('extras-img').src = flag.png;
    document.getElementById('extras-img').alt = flag.alt;
    document.getElementById('extras-img').style.display = 'relative';
}

function renderCoat(countryInfo) {
    const { name } = countryInfo;
    const { coatOfArms } = countryInfo;

    countryName.textContent = name;
    document.getElementById('extras-img').src = coatOfArms;
    document.getElementById('extras-img').alt = 'No Coat of Arms found!';
    document.getElementById('extras-img').style.width = '300px';
    document.getElementById('extras-img').style.height = 'auto';

    return;
}

//NOTE: Main renderer. if a config opt argument is passed it will delegate that info to the specific rendering function
function render(countryInfo, configopt = false) {
    if (configopt) {
        if (countryInfo.capital) {
            clearInfo();
            renderCapital(countryInfo);
            return;
        } else if (countryInfo.continents) {
            clearInfo();
            renderContinents(countryInfo);
            return;
        } else if (countryInfo.population) {
            clearInfo();
            renderPopulation(countryInfo);
            return;
        } else if (countryInfo.timezones) {
            clearInfo();
            renderTimezones(countryInfo);
            return;
        } else if (countryInfo.callCode) {
            clearInfo();
            renderCallingCode(countryInfo);
            return;
        } else if (countryInfo.flag) {
            clearInfo();
            renderFlag(countryInfo);
            return;
        } else if (countryInfo.coatOfArms) {
            clearInfo();
            renderCoat(countryInfo);
            return;
        } else if (countryInfo.currency) {
            clearInfo();
            renderCurrency(countryInfo);
            return;
        }
    }
    clearInfo();

    countryName.textContent = countryInfo.name[0];
    //NOTE: countryExtrasHeading is meant to be used as a heading for specific info (e.g for getCapital) but by default it will be used to display the official country name;

    countryExtrasHeading.textContent = countryInfo.name[1] === countryInfo.name[0] ? null : countryInfo.name[1];

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
    callingCode.innerHTML = `Calling code: <b>${countryInfo.callingCode}</b>`;

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

//NOTE: All event listeners
getAll.addEventListener('click', async () => {
    const countryInfo = await getAllCountryInfo(countrySelect.value);
    render(countryInfo);
});

document.getElementById('get-capital').addEventListener('click', async () => {
    const countryInfo = await getCapital(countrySelect.value);
    render(countryInfo, true);
});

document.getElementById('get-continents').addEventListener('click', async () => {
    const countryInfo = await getContinents(countrySelect.value);
    render(countryInfo, true);
});

document.getElementById('get-dial-code').addEventListener('click', async () => {
    const countryInfo = await getCallCode(countrySelect.value);
    render(countryInfo, true);
});

document.getElementById('get-flag').addEventListener('click', async () => {
    const countryInfo = await getFlag(countrySelect.value);
    render(countryInfo, true);
});

document.getElementById('get-timezone').addEventListener('click', async () => {
    const countryInfo = await getTimezone(countrySelect.value);
    render(countryInfo, true);
});

document.getElementById('get-currency').addEventListener('click', async () => {
    const countryInfo = await getCurrency(countrySelect.value);
    render(countryInfo, true);
});

document.getElementById('get-population').addEventListener('click', async () => {
    const countryInfo = await getPopulation(countrySelect.value);
    render(countryInfo, true);
});

document.getElementById('get-coat').addEventListener('click', async () => {
    const countryInfo = await getCoat(countrySelect.value);
    render(countryInfo, true);
});
