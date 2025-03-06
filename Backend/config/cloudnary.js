import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadToCloud = async (localImgPath, publicId) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localImgPath) {
        return false;
    }

    try {
        let response = await cloudinary.uploader.upload(localImgPath, {
            public_id: publicId,
        });

        if (!response) {
            return false;
        }
        fs.unlinkSync(localImgPath);
        // console.log(fs.unlinkSync(localImgPath))
        return response;

    } catch (error) {
        console.log(error);
        fs.unlinkSync(localImgPath);
        return false
    }
};

export default uploadToCloud;
