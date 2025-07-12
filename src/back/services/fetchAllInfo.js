//NOTE: getCallingCode is a function that communicates with the callingCode JSON database to get the country calling code
import { getCallingCode } from '../models/callingCodeModel.js';

export async function fetchAllInfo(countryCode) {
    try {
        //NOTE: Get the country info from REST countries
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
            mode: 'cors',
            headers: {
                Accept: 'application/json'
            }
        });

        const data = await response.json();

        // NOTE: This is the object that will be sent back to client
        const allCountryInfo = {
            name: [],
            independent: null,
            languages: [],
            capital: [],
            region: '',
            landlocked: null,
            continents: [],
            timezones: [],
            flag: {
                png: '',
                alt: ''
            },
            coatOfArms: '',
            car: {
                side: ''
            },
            population: 0,
            callingCode: '',
            currency: {
                code: '',
                name: ''
            }
        };

        // NOTE: Adding all info into response object
        allCountryInfo.name.push(data[0].name.common, data[0].name.official);

        data[0].independent ? (allCountryInfo.independent = true) : (allCountryInfo.independent = false);

        for (let language in data[0].languages) {
            allCountryInfo.languages.push(data[0].languages[language]);
        }

        //NOTE:  Capital city is an array in the response object from REST countries. Why? I have no idea. I've yet to receive a response object with multiple capital cities. But, I will leave it just incase there is a reason for it
        data[0].capital.forEach((capital) => allCountryInfo.capital.push(capital));

        allCountryInfo.region += data[0].region;

        data[0].landlocked ? (allCountryInfo.landlocked = true) : (allCountryInfo.landlocked = false);

        data[0].continents.forEach((continent) => allCountryInfo.continents.push(continent));

        data[0].timezones.forEach((timezone) => allCountryInfo.timezones.push(timezone));

        allCountryInfo.flag.png = `${data[0].flags.png}`;
        allCountryInfo.flag.alt = `${data[0].flags.alt}`;

        allCountryInfo.coatOfArms = `${data[0].coatOfArms ? data[0].coatOfArms.png : 'No coat of arms found'}`;

        allCountryInfo.population = data[0].population;
        allCountryInfo.callingCode = `+ ${getCallingCode(countryCode)}`;
        allCountryInfo.car.side = data[0].car.side;

        const currencies = data[0].currencies;

        //NOTE: This for loop will access the currencies object and pull out ONE currency name and it's code
        for (let code in currencies) {
            const info = currencies[code];
            allCountryInfo.currency.code = code;
            allCountryInfo.currency.name = info.name;
            break;
        }

        return allCountryInfo;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
