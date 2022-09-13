import { unlink } from "fs"
import path from "path"

export default async function(image: string) {
    try {
        await unlink(path.join(__dirname, `/images/products/${image}`), () => {})
        return true
    } catch (error) {
        return false
    }
}