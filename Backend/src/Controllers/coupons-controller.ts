import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import couponsLogic from '../Logic/coupon-logic';
import { ICouponModel } from '../Models/coupon-model';

const router = express.Router();
const controllerRoute = "/coupons";

router.get(`${controllerRoute}`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allCouponS = await couponsLogic.getAllCoupons();
        res.json(allCouponS);
    }
    catch (err: any) {
        next({ error: err, from: "CouponsController-GetAll" });
    }
});

router.post(`${controllerRoute}/:code`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coupon = await couponsLogic.getCouponByCode(req.params.code);
        res.json(coupon);
    }
    catch (err: any) {
        next({ error: err, from: "CouponsController-GetFromCode" });
    }
});

router.post(`${controllerRoute}`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.value = +req.body.value;
        req.body.endBy = new Date(req.body.endBy);

        const addedCoupon = await couponsLogic.addCoupon(req.body as ICouponModel);
        res.status(201).json(addedCoupon);
    }
    catch (err: any) {
        next({ error: err, from: "CouponsController-NewCoupon" });
    }
});

router.delete(`${controllerRoute}/:id`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await couponsLogic.deleteCoupon(req.params.id);
        res.sendStatus(204);
    }
    catch (err: any) {
        next({ error: err, from: "CouponsController-DeleteCoupon" });
    }
});

router.put(`${controllerRoute}/:id`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.discount) {
            req.body.discount = +req.body.discount;
        }
        if (req.body.endBy) {
            req.body.endBy = new Date(req.body.endBy);
        }
        const updatedCoupon = await couponsLogic.updateCoupon(req.params.id, req.body);
        res.json(updatedCoupon);
    }
    catch (err: any) {
        next({ error: err, from: "CouponsController-AugmentCoupon" });
    }
});

export default router;