import fs from 'fs';
import path from 'path';



export const FileRemoved = (_filePath: string) => {
    const BASE_UPLOAD_PATH = path.join(process.cwd(), '');
    // // Convert URL to local file path
    const serverurl = process.env.SERVER_URL?.toString();
    if (serverurl) {
        const relativeFilePath = _filePath.replace(serverurl, '');
        const absoluteFilePath = path.join(BASE_UPLOAD_PATH, relativeFilePath);
        if (absoluteFilePath) {
            if (fs.existsSync(absoluteFilePath)) {
                fs.unlinkSync(absoluteFilePath);
                console.log(`Deleted  file: ${absoluteFilePath}`);
                return true;
            }
        }
        //     return absoluteFilePath;
    }
    return false;
}
