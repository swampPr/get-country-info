import http from 'http';
import { logger } from './middlewares/logger.js';
import { jsonMiddleware } from './middlewares/jsonMiddleware.js';
import { router } from './routers/getCountryInfoRouter.js';

const PORT = process.env.PORT;

export const server = http.createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            router(req, res);
        });
    });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
