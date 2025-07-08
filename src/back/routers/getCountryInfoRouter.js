import { getAllCountryInfo } from '../handlers/getAllCountryInfoHandler.js';
import { parse } from 'url';

const routers = {
    'GET /country': getAllCountryInfo
};

export async function router(req, res) {
    console.log('ROUTER GOT REQUEST');
    const { pathname } = parse(req.url, true);
    const parts = pathname.split('/').filter(Boolean);

    const route = '/' + parts[0];
    const routeKey = `${req.method} ${route}`;
    const handler = routers[routeKey];

    if (handler) {
        req.params = { code: parts[1] };
        await handler(req, res);

        //NOTE: Return 0 = Return "Success"
        return 0;
    } else {
        res.statusCode = 404;

        res.end(
            JSON.stringify({
                errorMessage: 'URL NOT FOUND'
            })
        );
    }
}
