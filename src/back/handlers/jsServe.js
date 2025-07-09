//NOTE: Importing necessary node modules
import path from 'path';
import url from 'url';
import fs from 'fs/promises';

//NOTE: Getting the current files directory name to be able to easier traverse the file system and serve the .js file to the browser
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//NOTE: Traversing the file system towards the app.js file
const jsFile = path.join(__dirname, '..', '..', 'front', 'app.js');

//NOTE: This function will read the file and send it to the browser or it will return a 500 code if something goes wrong
export async function serveJS(req, res) {
    try {
        const file = await fs.readFile(jsFile, 'utf-8');
        res.statusCode = 200;
        res.end(file);
    } catch (err) {
        res.statusCode = 500;
        res.end('FETCH FAILED');
    }
}
