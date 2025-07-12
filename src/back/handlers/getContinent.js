import { fetchContinent } from '../services/fetchContinent.js';

export async function getContinent(req, res) {
    console.log('HANDLER GOT REQUEST (CONTINENT)');
    const countryCode = req.params.code;
    if (!countryCode) {
        res.writeHead(404, {
            'Content-type': 'text/plain'
        });

        res.end('COUNTRY NOT FOUND');
    }
    try {
        res.statusCode = 200;

        const countryContinents = await fetchContinent(countryCode);

        res.end(JSON.stringify(countryContinents));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'Content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
