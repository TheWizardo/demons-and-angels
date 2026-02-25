import express, { NextFunction, Request, Response } from "express";
import config from "../Utils/config";
import imagesLogic from "../Logic/images-logic";

const router = express.Router();
const controllerRoute = "/images";

router.get(`${controllerRoute}/:name`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileName = req.params.name;

        const requestedFilePath = `${config.imagesFolder}/${fileName}`;
        const filePath = await imagesLogic.getFilePath(requestedFilePath);
        res.sendFile(filePath);
    }
    catch (err: any) {
        next({error: err, from: "ImagesController-GetImage"});
    }
});

router.post(`${controllerRoute}/upload`, async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    console.log(req.files);
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "No files were uploaded." });
        }
        const uploadedFile = req.files?.image[0]; // Assuming the file input field is named 'file'

        const savedFileName = await imagesLogic.addImage(uploadedFile, "");
        res.status(200).json({ fileName: savedFileName });
    }
    catch (err: any) {
        next({error: err, from: "ImagesController-UploadImage"});
    }
});

export default router;