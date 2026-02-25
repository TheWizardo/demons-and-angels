"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var verify_user_1 = __importDefault(require("../Middleware/verify-user"));
var orders_logic_1 = __importDefault(require("../Logic/orders-logic"));
var router = express_1.default.Router();
var controllerRoute = "/orders";
router.get("".concat(controllerRoute), verify_user_1.default.verifyAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allOrders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orders_logic_1.default.getAllOrders()];
            case 1:
                allOrders = _a.sent();
                res.json(allOrders);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next({ error: err_1, from: "OrdersController-GetAll" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("".concat(controllerRoute, "/:id"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orders_logic_1.default.getOrderById(req.params.id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next({ error: err_2, from: "OrdersController-GetOne" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("".concat(controllerRoute), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var addedOrder, err_3;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 2, , 3]);
                req.body.price = +req.body.price;
                req.body.amount = +req.body.amount;
                req.body.street_num = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.street_num) ? +((_b = req.body) === null || _b === void 0 ? void 0 : _b.street_num) : undefined;
                req.body.dedicate = ((_c = req.body) === null || _c === void 0 ? void 0 : _c.dedicate) || ((_d = req.body) === null || _d === void 0 ? void 0 : _d.dedicate) === "true" ? true : false;
                req.body.for_self = ((_e = req.body) === null || _e === void 0 ? void 0 : _e.for_self) || ((_f = req.body) === null || _f === void 0 ? void 0 : _f.for_self) === "true" ? true : false;
                return [4 /*yield*/, orders_logic_1.default.newOrder(req.body)];
            case 1:
                addedOrder = _g.sent();
                res.status(201).json(addedOrder);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _g.sent();
                next({ error: err_3, from: "OrdersController-NewOrder" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.put("".concat(controllerRoute, "/:id"), verify_user_1.default.verifyAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedOrder, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req.body.createdAt = new Date(req.body.createdAt);
                req.body.shipping_cost = +req.body.shipping_cost;
                req.body.total = +req.body.total;
                return [4 /*yield*/, orders_logic_1.default.updateOrder(req.params.id, req.body)];
            case 1:
                updatedOrder = _a.sent();
                res.json(updatedOrder);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next({ error: err_4, from: "OrdersController-TrackingNumber" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
