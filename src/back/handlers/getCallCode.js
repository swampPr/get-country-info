import { fetchCallCode } from '../services/fetchCallCode.js';

export async function getCallCode(req, res) {
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });
        res.end('COUNTRY NOT FOUND');
    }
    try {
        res.statusCode = 200;

        const countryCallCode = await fetchCallCode(countryCode);

        res.end(JSON.stringify(countryCallCode));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
