import path from 'path';
import url from 'url';
import fs from 'fs/promises';

//NOTE: Getting the current files directory name to be able to easier traverse the file system and serve the .js file to the browser
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsFile = path.join(__dirname, '..', '..', 'front', 'app.js');

export async function serveJS(req, res) {
    try {
        const file = await fs.readFile(jsFile, 'utf-8');
        res.statusCode = 200;
        res.end(file);
    } catch (err) {
        res.writeHead(500, {
            'content-type': 'text/plain'
        });
        res.end('FETCH FAILED');
    }
}
