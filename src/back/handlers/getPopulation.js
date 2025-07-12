import { fetchPopulation } from '../services/fetchPopulation.js';

export async function getPopulation(req, res) {
    const countryCode = req.params?.code;
    if (!countryCode) {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });

        res.end('COUNTRY NOT FOUND');
    }

    try {
        res.statusCode = 200;
        const countryPopulation = await fetchPopulation(countryCode);

        res.end(JSON.stringify(countryPopulation));
    } catch (err) {
        console.log(err);
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
