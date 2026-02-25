import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import ordersLogic from '../Logic/orders-logic';
import { IOrderModel } from '../Models/order-model';

const router = express.Router();
const controllerRoute = "/orders";

router.get(`${controllerRoute}`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allOrders = await ordersLogic.getAllOrders();
        res.json(allOrders);
    }
    catch (err: any) {
        next({ error: err, from: "OrdersController-GetAll" });
    }
});

router.get(`${controllerRoute}/:id`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await ordersLogic.getOrderById(req.params.id);
        res.json(order);
    }
    catch (err: any) {
        next({ error: err, from: "OrdersController-GetOne" });
    }
});

router.post(`${controllerRoute}`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.price = +req.body.price;
        req.body.amount = +req.body.amount;
        req.body.street_num = req.body?.street_num ? +req.body?.street_num : undefined;
        req.body.dedicate = req.body?.dedicate || req.body?.dedicate === "true" ? true : false;
        req.body.for_self = req.body?.for_self || req.body?.for_self === "true" ? true : false;

        const addedOrder = await ordersLogic.newOrder(req.body as IOrderModel);
        res.status(201).json(addedOrder);
    }
    catch (err: any) {
        next({ error: err, from: "OrdersController-NewOrder" });
    }
});

// router.get(`${controllerRoute}/search/:phone`, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const order = await ordersLogic.getOrderByPhone(req.params.phone);
//         res.json(order);
//     }
//     catch (err: any) {
//         next({ error: err, from: "OrdersController-SearchByPhone" });
//     }
// });

// router.put(`${controllerRoute}/:id`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         req.body.price = +req.body.price;
//         req.body.amount = +req.body.amount;
//         req.body.street_num = req.body?.street_num ? +req.body?.street_num : undefined;
//         req.body.dedicate = req.body?.dedicate === "true" ? true : false;
//         req.body.for_self = req.body?.for_self === "true" ? true : false;
//
//         const order = new OrderModel(req.body);
//         const updatedOrder = await ordersLogic.updateOrder(order);
//         res.json(updatedOrder);
//     }
//     catch (err: any) {
//         next({error: err, from: "OrdersController-AugmentOrder"});
//     }
// });

router.put(`${controllerRoute}/:id`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.createdAt = new Date(req.body.createdAt);
        req.body.shipping_cost = +req.body.shipping_cost;
        req.body.total = +req.body.total;
        const updatedOrder = await ordersLogic.updateOrder(req.params.id, req.body as IOrderModel);
        res.json(updatedOrder);
    }
    catch (err: any) {
        next({ error: err, from: "OrdersController-TrackingNumber" });
    }
});

export default router;