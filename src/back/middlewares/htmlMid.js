//NOTE: This middleware will add important headers to .html file responses

export function htmlMid(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    next();
}
