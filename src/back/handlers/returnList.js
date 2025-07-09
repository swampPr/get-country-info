import iso from 'iso-3166-1-alpha-2';

export function returnList(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.end(JSON.stringify(iso.getData()));
}
