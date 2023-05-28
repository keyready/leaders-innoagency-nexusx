import { extname } from "path";
import { diskStorage } from 'multer'
import * as path from 'path'

export function OptionsFileUpload (dirName) {
    return {    
    storage:diskStorage({
        destination: path.resolve(`src/static/img/${dirName}`),
        filename: (req, file, cb) => {
            const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
            return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }
}