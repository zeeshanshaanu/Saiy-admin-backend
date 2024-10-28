
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
const upload = multer({ storage });


async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });

    return result;
}

const documentUploadUtil = async (fileBuffer, originalName) => {
    return new Promise((resolve, reject) => {
        const fileExtension = originalName?.split('.')?.pop(); // Get the file extension
        const publicId = `${Date.now()}_${originalName?.replace(`.${fileExtension}`, '')}`; // Generate a public ID

        // Uploading the file buffer directly
        cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: publicId }, // Specify the resource type and public ID
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(fileBuffer); // End the stream with the file buffer
    });
};




export { upload, imageUploadUtil, documentUploadUtil };
