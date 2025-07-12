export async function fetchTimezone(countryCode) {
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
        const countryTimezone = {
            name: '',
            timezones: []
        };

        countryTimezone.name = data[0].name.common;
        //NOTE: Pull out each timezone from the response and push it into the response object
        data[0].timezones.forEach((timezone) => countryTimezone.timezones.push(timezone));

        return countryTimezone;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
