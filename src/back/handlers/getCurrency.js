import { fetchCurrency } from '../services/fetchCurrency.js';

export async function getCurrency(req, res) {
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });

        res.end('COUNTRY NOT FOUND');
    }

    try {
        res.statusCode = 200;

        const countryCurrency = await fetchCurrency(countryCode);

        res.end(JSON.stringify(countryCurrency));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
