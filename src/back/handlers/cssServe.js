import path from 'path';
import url from 'url';
import fs from 'fs/promises';

//NOTE: Getting the current files directory name to find the needed file
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssFile = path.join(__dirname, '..', '..', 'front', 'style.css');

export async function serveCSS(req, res) {
    try {
        const file = await fs.readFile(cssFile, 'utf-8');
        res.statusCode = 200;
        res.end(file);
    } catch (err) {
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
