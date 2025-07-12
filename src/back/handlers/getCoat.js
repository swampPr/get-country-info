import { fetchCoat } from '../services/fetchCoat.js';

export async function getCoat(req, res) {
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });

        res.end('COUNTRY NOT FOUND');
    }

    try {
        res.statusCode = 200;

        const countryCoat = await fetchCoat(countryCode);

        res.end(JSON.stringify(countryCoat));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'content-type': 'application/json'
        });
        res.end('FETCH FAILED');
    }
}
