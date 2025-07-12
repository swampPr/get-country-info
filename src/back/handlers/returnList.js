import iso from 'iso-3166-1-alpha-2';

export function returnList(req, res) {
    res.end(JSON.stringify(iso.getData()));
}
