export async function fetchFlag(countryCode) {
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
        const countryFlag = {
            name: '',
            flag: {
                png: '',
                alt: ''
            }
        };

        countryFlag.name = data[0].name.common;
        countryFlag.flag.png = data[0].flags.png;
        countryFlag.flag.alt = data[0].flags.alt;

        return countryFlag;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
