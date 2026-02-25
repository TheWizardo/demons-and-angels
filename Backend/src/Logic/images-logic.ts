import fs from 'fs'
import fsPromises from 'fs/promises';
import config from '../Utils/config';
import { UploadedFile } from 'express-fileupload';
import mongoose from 'mongoose';
import path from 'path';
import { ImageMetadata } from '../Models/product-model';

async function exists(filePath: string): Promise<boolean> {
    return new Promise((res, rej) => res(fs.existsSync(filePath)));
}

async function getFilePath(fullPath: string): Promise<string> {
    // checking if given image exists
    const exist = await exists(fullPath);
    if (!exist) {
        // returning default image
        return `${config.imagesFolder}/imageNotFound.png`;
    };
    return fullPath;
}

async function addImage(image: UploadedFile, pId: string): Promise<void> {
    const imageName = `${(new mongoose.Types.ObjectId()).toString()}${path.extname(image.name)}`;
    console.log(imageName);
    await image.mv(`${config.imagesFolder}/${imageName}`);
}

async function safeDelete(filename: string): Promise<void> {
    try {
        if (!filename) return;
        // check if file exists
        if (fs.existsSync(filename)) {
            // waits for the file not to be used by other programs
            await fsPromises.unlink(filename);
        }
    }
    catch (err: any) {
        console.error(err);
    }
}

function getNameFromMeta(imgMeta: ImageMetadata): string {
    return imgMeta._id.toString() + "." + imgMeta.format;
}


export default { getFilePath, addImage, safeDelete, getNameFromMeta };