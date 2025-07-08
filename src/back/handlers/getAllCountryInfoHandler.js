export async function getAllCountryInfo(req, res) {
    console.log(`HANDLER GOT REQUEST!`);
    const country = req.params?.code;
    if (!country) {
        res.writeHead(404, {
            'content-type': 'application/json'
        });

        res.end('COUNTRY NOT FOUND');
    }
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${country}`, {
            mode: 'cors',
            headers: {
                Accept: 'application/json'
            }
        });

        const data = await response.json();
        //NOTE: Response object with all the necessary country info:
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
            population: '',
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

        data[0].capital.forEach((capital) => allCountryInfo.capital.push(capital));

        allCountryInfo.region += data[0].region;

        data[0].landlocked ? (allCountryInfo.landlocked = true) : (allCountryInfo.landlocked = false);

        data[0].continents.forEach((continent) => allCountryInfo.continents.push(continent));

        data[0].timezones.forEach((timezone) => allCountryInfo.timezones.push(timezone));

        //NOTE: Adding country flag info to object flags array. PNG link and alt string
        allCountryInfo.flag.png = `${data[0].flags.png}`;
        allCountryInfo.flag.alt = `${data[0].flags.alt}`;

        allCountryInfo.coatOfArms = `${data[0].coatOfArms.png}`;

        allCountryInfo.population = data[0].population;

        const currencies = data[0].currencies;

        for (let code in currencies) {
            const info = currencies[code];
            allCountryInfo.currency.code = code;
            allCountryInfo.currency.name = info.name;
            break;
        }

        res.end(JSON.stringify(allCountryInfo));
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end('FAILED TO FETCH');
    }
}
