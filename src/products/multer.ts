import multer from "multer";
import path from "path";
import generateRandomId from "../utils/generateRandomId";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/utils/images/products'))
    },
    filename: (req, file, cb) => {
        let extension = file.originalname.split(".").pop()
        let name = generateRandomId() + "." + extension
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

export default upload