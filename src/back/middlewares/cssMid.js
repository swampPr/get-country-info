//NOTE: This middleware will add important headers to .css file responses
export function cssMid(req, res, next) {
    res.setHeader('content-type', 'text/css');
    next();
}
