//NOTE: Importing necessary node modules
import path from 'path';
import url from 'url';
import fs from 'fs/promises';

//NOTE: Getting the current files directory name to be able to easier traverse the file system and serve the .html file to the browser
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//NOTE: Traversing the file system towards the index.html file
const htmlFile = path.join(__dirname, '..', '..', 'front', 'index.html');

//NOTE: This function will read the file and send it to the browser or it will return a 500 code if something goes wrong
export async function serveHTML(req, res) {
    try {
        const file = await fs.readFile(htmlFile, 'utf-8');
        res.statusCode = 200;
        res.end(file);
    } catch (err) {
        res.statusCode = 500;
        res.end('FETCH FAILED');
    }
}
