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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var product_model_1 = require("../Models/product-model");
var config_1 = __importDefault(require("../Utils/config"));
var images_logic_1 = __importDefault(require("./images-logic"));
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_model_1.ProductModel.find()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getProductById(productId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_model_1.ProductModel.findById(productId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getShipment() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_model_1.ProductModel.findOne({ nameEn: "Shipment" })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var id, product, _i, _a, imgMeta;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = typeof productId === "string" ? new mongoose_1.default.Types.ObjectId(productId) : productId;
                    return [4 /*yield*/, product_model_1.ProductModel.findById(id)];
                case 1:
                    product = _b.sent();
                    if (!product)
                        return [2 /*return*/];
                    _i = 0, _a = product.images;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    imgMeta = _a[_i];
                    return [4 /*yield*/, images_logic_1.default.safeDelete("".concat(config_1.default.imagesFolder, "/").concat(images_logic_1.default.getNameFromMeta(imgMeta)))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: 
                // then delete doc
                return [4 /*yield*/, product_model_1.ProductModel.findByIdAndDelete(id)];
                case 6:
                    // then delete doc
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateProduct(productId, productEdits) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, raw_images, mongoEdits, updatedProduct;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = new mongoose_1.default.Types.ObjectId(productId);
                    _a = productEdits, raw_images = _a.raw_images, mongoEdits = __rest(_a, ["raw_images"]);
                    return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(id, mongoEdits, { new: true })];
                case 1:
                    updatedProduct = _b.sent();
                    if (!updatedProduct)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, product_model_1.ProductModel.findById(updatedProduct._id)];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, raw_images, mongoProduct, addedProduct;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = product, raw_images = _a.raw_images, mongoProduct = __rest(_a, ["raw_images"]);
                    return [4 /*yield*/, product_model_1.ProductModel.create(mongoProduct)];
                case 1:
                    addedProduct = _b.sent();
                    return [4 /*yield*/, product_model_1.ProductModel.findById(addedProduct._id)];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
function addImage(productId, image) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = new mongoose_1.default.Types.ObjectId(productId);
                    return [4 /*yield*/, images_logic_1.default.addImage(image, productId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(id, { $push: { images: { filename: image.name, format: image.mimetype.split("/")[1] } } })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllProducts: getAllProducts,
    deleteProduct: deleteProduct,
    getProductById: getProductById,
    getShipment: getShipment,
    updateProduct: updateProduct,
    addProduct: addProduct,
};
