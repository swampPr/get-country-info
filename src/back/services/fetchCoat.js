export async function fetchCoat(countryCode) {
    try {
        //NOTE: Get information from the REST countries API
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
            mode: 'cors',
            'content-type': 'application/json'
        });

        const data = await response.json();

        //NOTE: This is the object that will be sent back to the client
        const countryCoat = {
            name: '',
            coatOfArms: ''
        };

        countryCoat.name = data[0].name.common;
        countryCoat.coatOfArms = data[0].coatOfArms.png || 'No coat of arms found!';

        return countryCoat;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
