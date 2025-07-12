import callingCodes from '../jsonDB/callingCodesDB.json' with { type: 'json' };

//NOTE: This function communicates with the callingCode JSON database and maps the country code to its dial code
export function getCallingCode(countryCode) {
    countryCode = countryCode.toString().toUpperCase();

    const countryExists = callingCodes.findIndex((element) => element.iso === countryCode);
    if (countryExists === -1) {
        return '<u>Calling code not found<u>';
    }
    const country = callingCodes.filter((country) => country.iso === countryCode);

    return country[0].code;
}
