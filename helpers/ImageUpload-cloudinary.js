
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
cloudinary.config({
    cloud_name: "dqam1xnl0",
    api_key: "887197636453282",
    api_secret: "DuicTLs_gMY7koi84PULLO8f32g",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });

    return result;
}

const upload = multer({ storage });
export { upload, imageUploadUtil };
