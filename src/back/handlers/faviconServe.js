import path from 'path';
import url from 'url';
import fs from 'fs/promises';

//NOTE: Getting the current files directory name to be able to easier traverse the file system and serve the .png file to the browser
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icoFile = path.join(__dirname, '..', '..', 'front', 'images', 'favicon-32x32.png');

export async function serveFavicon(req, res) {
    try {
        const file = await fs.readFile(icoFile);
        res.writeHead(200, {
            'content-type': 'image/png'
        });
        res.end(file);
    } catch (err) {
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
