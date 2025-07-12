//NOTE: This middleware will add important headers to .js file responses
export function jsMid(req, res, next) {
    res.setHeader('Content-Type', 'text/javascript');
    next();
}
