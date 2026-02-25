import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import productsLogic from '../Logic/product-logic';
import { IProductModel } from '../Models/product-model';

const router = express.Router();
const controllerRoute = "/products";

router.get(`${controllerRoute}`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProducts = await productsLogic.getAllProducts();
        res.json(allProducts);
    }
    catch (err: any) {
        next({ error: err, from: "ProductsController-GetAll" });
    }
});

router.get(`${controllerRoute}/shipment`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productsLogic.getShipment();
        res.json(product);
    }
    catch (err: any) {
        next({ error: err, from: "ProductsController-GetShipment" });
    }
});

router.get(`${controllerRoute}/:id`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productsLogic.getProductById(req.params.id);
        res.json(product);
    }
    catch (err: any) {
        next({ error: err, from: "ProductsController-GetOne" });
    }
});

router.post(`${controllerRoute}`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.price = +req.body.price;
        if (req.body.discountedPrice) {
            req.body.discountedPrice = +req.body.discountedPrice;
        }
        req.body.requiresShipment = req.body.requiresShipment || req.body.requiresShipment === "true";

        const addedProduct = await productsLogic.addProduct(req.body as IProductModel);
        res.status(201).json(addedProduct);
    }
    catch (err: any) {
        next({ error: err, from: "ProductsController-NewProduct" });
    }
});

router.put(`${controllerRoute}/:id`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.price = +req.body.price;
        if (req.body.discountedPrice) {
            req.body.discountedPrice = +req.body.discountedPrice;
        }
        req.body.requiresShipment = req.body.requiresShipment || req.body.requiresShipment === "true";

        const updatedProduct = await productsLogic.updateProduct(req.params.id, req.body as IProductModel);
        res.json(updatedProduct);
    }
    catch (err: any) {
        next({ error: err, from: "ProductsController-UpdateProduct" });
    }
});

router.delete(`${controllerRoute}/:id`, verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productsLogic.deleteProduct(req.params.id);
        res.sendStatus(204);
    }
    catch (err: any) {
        next({ error: err, from: "ProductsController-DeleteProduct" });
    }
});

export default router;