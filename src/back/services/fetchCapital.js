export async function fetchCapital(countryCode) {
    try {
        //NOTE: Get information from the REST countries API
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
            mode: 'cors',
            headers: {
                accept: 'application/json'
            }
        });

        const data = await response.json();

        // NOTE: This is the object that will be sent back to client

        const countryCapital = {
            name: '',
            capital: []
        };

        countryCapital.name = data[0].name.common;

        //NOTE:  Capital city is an array in the response object from REST countries. Why? I have no idea. I've yet to receive a response object with multiple capital cities. But, I will leave it just incase there is a reason for it
        data[0].capital.forEach((capital) => countryCapital.capital.push(capital));

        return countryCapital;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
