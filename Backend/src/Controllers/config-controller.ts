import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import configLogic from '../Logic/config-logic';
import { IFrontendConfig } from '../Models/frontendConfig-model';

const router = express.Router();
const controllerRoute = "/config";

router.get(`${controllerRoute}`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config = await configLogic.getConfig();
        res.json(config);
    }
    catch (err: any) {
        next({ error: err, from: "ConfigController-GetConfig" });
    }
});

router.put(`${controllerRoute}`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.max_physical = +req.body?.max_physical;
        req.body.showBanner = req.body?.showBanner || req.body?.showBanner === "true";

        const conf = await configLogic.updateConfig(req.body as Partial<IFrontendConfig>);
        res.json(conf);
    }
    catch (err: any) {
        next({ error: err, from: "ConfigController-UpdateConfig" });
    }
});

export default router;