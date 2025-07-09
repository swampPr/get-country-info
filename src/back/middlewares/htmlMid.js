//NOTE: If the browser requests a .html file, this middleware will add important headers to the response
export function htmlMid(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    next();
}
