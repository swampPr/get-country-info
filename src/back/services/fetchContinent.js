export async function fetchContinent(countryCode) {
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
        const countryContinents = {
            name: '',
            continents: []
        };

        countryContinents.name = data[0].name.common;
        data[0].continents.forEach((continent) => countryContinents.continents.push(continent));

        return countryContinents;
    } catch (err) {
        console.log(err);

        throw err;
    }
}
