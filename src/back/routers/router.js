//NOTE: Importing all necessary handlers and modules

import { getAllCountryInfo } from '../handlers/getAllCountryInfoHandler.js';
import { returnList } from '../handlers/returnList.js';
import { parse } from 'url';
import { serveHTML } from '../handlers/htmlServe.js';
import { serveCSS } from '../handlers/cssServe.js';
import { serveJS } from '../handlers/jsServe.js';
import { serveFavicon } from '../handlers/faviconServe.js';
import { getCapital } from '../handlers/getCapital.js';
import { getContinent } from '../handlers/getContinent.js';
import { getCallCode } from '../handlers/getCallCode.js';
import { getFlag } from '../handlers/getFlag.js';
import { getTimezones } from '../handlers/getTimezone.js';
import { getCurrency } from '../handlers/getCurrency.js';
import { getPopulation } from '../handlers/getPopulation.js';
import { getCoat } from '../handlers/getCoat.js';

//NOTE: This object routes the request to the appropriate handler
const routers = {
    'GET /country': getAllCountryInfo,
    'GET /list': returnList,
    'GET /': serveHTML,
    'GET /index.html': serveHTML,
    'GET /style.css': serveCSS,
    'GET /app.js': serveJS,
    'GET /favicon': serveFavicon,
    'GET /capital': getCapital,
    'GET /continent': getContinent,
    'GET /callcode': getCallCode,
    'GET /flag': getFlag,
    'GET /timezone': getTimezones,
    'GET /currency': getCurrency,
    'GET /population': getPopulation,
    'GET /coat': getCoat
};

//NOTE: This function will validate the URL and map it to the appropriate handler
export async function router(req, res) {
    console.log('ROUTER GOT REQUEST');

    //NOTE: If the browser requests the HTML. then map the request to the HTML handler
    if (req.url === '/' || req.url.endsWith('index.html')) {
        const routeKey = 'GET /';
        const handler = routers[routeKey];
        if (handler) {
            await handler(req, res);

            return 0;
        } else {
            res.writeHead(404, {
                'content-type': 'text/plain'
            });

            res.end('HTML NOT FOUND');
        }
    }

    //NOTE: The code below will grab the pathname of the URL, split it into an array to create a route key. The route key will be used to map the request to the appropriate handler
    const { pathname } = parse(req.url, true);
    const parts = pathname.split('/').filter(Boolean);

    const route = '/' + parts[0];
    const routeKey = `${req.method} ${route}`;
    const handler = routers[routeKey];

    if (handler) {
        //NOTE: The second part of the array will be added to the params of the request.
        req.params = { code: parts[1] };
        await handler(req, res);

        return 0;
    } else {
        res.writeHead(404, {
            'content-type': 'application/json'
        });

        res.end(
            JSON.stringify({
                errorMessage: 'URL NOT FOUND'
            })
        );
    }
}
