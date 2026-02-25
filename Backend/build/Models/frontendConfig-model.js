"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendConfig = exports.FrontendConfigSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.FrontendConfigSchema = new mongoose_1.default.Schema({
    max_physical: {
        required: true,
        type: Number,
        max: [10, "max_physical cannot be more than 10"],
        min: [0, "max_physical cannot be negative"]
    },
    international_phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\+[1-9]\d{1,14}$/.test(v);
            }, // E.164 format
            message: function (props) {
                return "".concat(props.value, " is not a valid international phone number");
            },
        },
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    showBanner: {
        type: Boolean,
        required: true,
        default: false,
    },
    banner_message: {
        type: String,
        required: function () {
            return this.showBanner;
        },
        trim: true,
        default: "",
    },
    shipping_cost: {
        type: Number,
        required: true,
        min: [0, "Shipping cannot be negative"]
    }
}, { timestamps: true });
exports.FrontendConfig = mongoose_1.default.model("FrontendConfig", exports.FrontendConfigSchema, "FrontendConfig");
