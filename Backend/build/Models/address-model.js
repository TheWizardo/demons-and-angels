"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.AddressSchema = new mongoose_1.default.Schema({
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: [20, 'City name cannot exceed 20 characters']
    },
    street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true,
        maxlength: [25, 'Street name cannot exceed 25 characters']
    },
    houseNumber: {
        type: String,
        required: [true, 'House number is required'],
        trim: true,
        maxlength: [5, 'House number cannot exceed 5 characters']
    },
    zip: {
        type: String,
        required: [true, 'ZIP code is required'],
        trim: true,
        match: [/^\d{7}$/, "Please enter a valid 7-digit ZIP code"],
    }
});
