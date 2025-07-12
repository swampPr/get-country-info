import path from 'path';
import url from 'url';
import fs from 'fs/promises';

//NOTE: Getting the current files directory name to be able to easier traverse the file system and serve the .html file to the browser
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlFile = path.join(__dirname, '..', '..', 'front', 'index.html');

export async function serveHTML(req, res) {
    try {
        const file = await fs.readFile(htmlFile, 'utf-8');
        res.statusCode = 200;
        res.end(file);
    } catch (err) {
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
