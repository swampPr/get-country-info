import { fetchCapital } from '../services/fetchCapital.js';

export async function getCapital(req, res) {
    console.log('HANDLER GOT REQUEST (CAPITAL)');
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('COUNTRY NOT FOUND');
    }

    try {
        res.statusCode = 200;
        const countryCapital = await fetchCapital(countryCode);
        res.end(JSON.stringify(countryCapital));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'Content-Type': 'application/json'
        });
        res.end('FETCH FAILED');
    }
}
