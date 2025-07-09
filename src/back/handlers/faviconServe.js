//NOTE: Importing necessary node modules
import path from 'path';
import url from 'url';
import fs from 'fs/promises';

//NOTE: Getting the current files directory name to be able to easier traverse the file system and serve the .png file to the browser
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//NOTE: Traversing the file system towards the .png file
const icoFile = path.join(__dirname, '..', '..', 'front', 'images', 'favicon-32x32.png');

//NOTE: This function will read the file and send it to the browser or it will return a 500 code if something goes wrong
export async function serveFavicon(req, res) {
    try {
        const file = await fs.readFile(icoFile);
        res.writeHead(200, {
            'content-type': 'image/png'
        });
        res.end(file);
    } catch (err) {
        res.statusCode = 500;
        res.end('FETCH FAILED');
    }
}
