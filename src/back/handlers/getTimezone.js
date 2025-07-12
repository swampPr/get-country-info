import { fetchTimezone } from '../services/fetchTimezone.js';

export async function getTimezones(req, res) {
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });
        res.end('COUNTRY NOT FOUND');
    }

    try {
        res.statusCode = 200;

        const countryTimezone = await fetchTimezone(countryCode);
        res.end(JSON.stringify(countryTimezone));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
