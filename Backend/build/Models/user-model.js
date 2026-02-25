"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = exports.UserRoles = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var customer_model_1 = require("./customer-model");
var address_model_1 = require("./address-model");
var UserRoles;
(function (UserRoles) {
    UserRoles["admin"] = "admin";
    UserRoles["user"] = "user";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
exports.UserSchema = new mongoose_1.default.Schema({
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false, // Don't include password in queries by default
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: Object.values(UserRoles),
            message: "Role must be a valid role",
        },
        default: "user",
    },
    customer: {
        type: customer_model_1.CustomerSchema,
        required: [true, "Customer information is required"]
    },
    address: {
        type: address_model_1.AddressSchema,
        required: [true, "User address is required"]
    }
}, {
    versionKey: false
});
exports.UserModel = mongoose_1.default.model("UserModel", exports.UserSchema, "Users");
