import http from 'http';
import { logger } from './middlewares/logger.js';
import { jsonMiddleware } from './middlewares/jsonMiddleware.js';
import { cssMid } from './middlewares/cssMid.js';
import { htmlMid } from './middlewares/htmlMid.js';
import { jsMid } from './middlewares/jsMid.js';
import { router } from './routers/router.js';

//NOTE: Localhost PORT that will host the server
const PORT = process.env.PORT;

//NOTE: Functions that will match the request to the correct middlewares
const always = () => true;
const cssMatch = (req) => req.url.endsWith('.css') || req.headers.accept?.includes('text/css');
const htmlMatch = (req) => req.url === '/' || req.url.endsWith('.html') || req.headers.accept?.includes('text/html');
const jsMatch = (req) => req.url.endsWith('.js') || req.headers.accept?.includes('text/javascript');
const jsonMatch = (req) => req.headers.accept?.includes('application/json');

//NOTE: Array of objects that hold the function to match the request to the proper middlewares and the middleware function for that request
const middlewareStack = [
    { match: always, middleware: logger },
    { match: cssMatch, middleware: cssMid },
    { match: htmlMatch, middleware: htmlMid },
    { match: jsMatch, middleware: jsMid },
    { match: jsonMatch, middleware: jsonMiddleware },
    { match: always, middleware: router }
];

//NOTE: This function takes the above ^ array and filters the middlewares that should be used for the current request
function runMiddlewares(req, res, stack) {
    let i = 0;
    const shouldRun = stack.filter((el) => el.match(req));

    //NOTE: This is a recursive function that will run the appropriate middlewares on the request
    function next(idx) {
        if (idx >= shouldRun.length) return;
        const { middleware } = shouldRun[idx];
        middleware(req, res, () => next(idx + 1));
    }

    next(i);
}

//NOTE: Server
export const server = http.createServer((req, res) => {
    runMiddlewares(req, res, middlewareStack);
});

//NOTE: Server listener
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
