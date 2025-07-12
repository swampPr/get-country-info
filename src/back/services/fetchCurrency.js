export async function fetchCurrency(countryCode) {
    try {
        //NOTE: Get information from the REST countries API
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
            mode: 'cors',
            headers: {
                accept: 'application/json'
            }
        });

        const data = await response.json();

        //NOTE: This is the object that will be sent back to the client
        const countryCurrency = {
            name: '',
            currency: {
                code: '',
                name: ''
            }
        };

        countryCurrency.name = data[0].name.common;
        //NOTE: This loop will run through the currencies object and pull out ONE currency
        const currencies = data[0].currencies;
        for (let code in currencies) {
            const info = currencies[code];
            countryCurrency.currency.code = code;
            countryCurrency.currency.name = info.name;
            break;
        }

        return countryCurrency;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
