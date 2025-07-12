export async function fetchPopulation(countryCode) {
    try {
        //NOTE: Get information from the REST countries API
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
            mode: 'cors',
            accept: 'application/json'
        });
        const data = await response.json();

        //NOTE: This is the object that will be sent back to the client
        const countryPopulation = {
            name: '',
            population: ''
        };

        countryPopulation.name = data[0].name.common;
        countryPopulation.population = data[0].population;

        return countryPopulation;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
