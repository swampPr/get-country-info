//NOTE: If the browser requests a .css file, then this middleware will add import headers to the response
export function cssMid(req, res, next) {
    res.setHeader('content-type', 'text/css');
    next();
}
