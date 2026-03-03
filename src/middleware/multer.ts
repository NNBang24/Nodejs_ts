import multer from "multer";
import path from "path";
import { v4 } from "uuid";

const fileUpLoadMiddleware = (fieldName: string, dir: string = 'images') => {
    return multer({
        storage: multer.diskStorage({
            destination: 'public/' + dir, // file anh duoc luu o folder public 
            filename: (req, file, cb) => {
                cb(null, v4() + path.extname(file.originalname))
            } // tao ra ten file de luu tru 
        }),
        limits: {
            fileSize: 1024 * 1024 * 3  // 3mb
        },
        fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
                cb(null, true);
            }
            else {
                cb(new Error('Chỉ cho phép sử dụng ảnh định dạng JPEG và PNG.') ,false)
            }
        }
    }).single(fieldName)
}

export default fileUpLoadMiddleware 