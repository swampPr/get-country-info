import { fetchAllInfo } from '../services/fetchAllInfo.js';

export async function getAllCountryInfo(req, res) {
    console.log(`HANDLER GOT REQUEST!`);
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });

        res.end('COUNTRY NOT FOUND');
    }
    try {
        res.statusCode = 200;
        const countryInfo = await fetchAllInfo(countryCode);

        res.end(JSON.stringify(countryInfo));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'content-type': 'text/plain'
        });

        res.end('FETCH FAILED');
    }
}
