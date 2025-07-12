//NOTE: Importing the getCallingCode function from the calling code model to get information from the calling code JSON DB
import { getCallingCode } from '../models/callingCodeModel.js';

export async function fetchCallCode(countryCode) {
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
        const countryCallCode = {
            name: '',
            callCode: ''
        };

        countryCallCode.name = data[0].name.common;
        countryCallCode.callCode = getCallingCode(countryCode);

        return countryCallCode;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
