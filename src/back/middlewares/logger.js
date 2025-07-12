//NOTE: This middleware will log out the current request URL and the request for debugging purposes
export function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
