import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../Models/credentials-model";
import { IUserModel } from "../Models/user-model";
import authLogic from "../Logic/auth-logic";
import verify from "../Middleware/verify-user";

const router = express.Router();
const controllerRoute = "/auth";

router.post(`${controllerRoute}/login`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cred = new CredentialsModel(req.body);
        const token = await authLogic.login(cred);
        res.json(token);
    }
    catch (err: any) {
        next({ error: err, from: "AuthController-Login" });
    }
});

router.post(`${controllerRoute}/register`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req.body as IUserModel);
        const token = await authLogic.register(user);
        res.json(token);
    }
    catch (err: any) {
        next({ error: err, from: "AuthController-Register" });
    }
});


router.delete(`${controllerRoute}/user/:id`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await authLogic.deleteUser(req.params.id);
        res.sendStatus(204);
    }
    catch (err: any) {
        next({ error: err, from: "AuthController-DeleteUser" });
    }
});

router.get(`${controllerRoute}/verify-admin`, verify.verifyAdmin, async (req: Request, res: Response) => {
    res.sendStatus(200);
});


export default router;