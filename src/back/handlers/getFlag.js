import { fetchFlag } from '../services/fetchFlag.js';

export async function getFlag(req, res) {
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });

        res.end('COUNTRY NOT FOUND');
    }
    try {
        res.statusCode = 200;
        const countryFlag = await fetchFlag(countryCode);

        res.end(JSON.stringify(countryFlag));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
