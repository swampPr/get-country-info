//NOTE: If the response is a JSON object, then this middleware will add important headers
export function jsonMiddleware(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
}
