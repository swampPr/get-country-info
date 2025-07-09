//NOTE: If the browser requests a .js file, this middleware will add important headers to the response
export function jsMid(req, res, next) {
    res.setHeader('Content-Type', 'text/javascript');
    next();
}
