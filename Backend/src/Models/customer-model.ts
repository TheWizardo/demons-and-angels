import mongoose from "mongoose";

export interface ICustomerModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export const CustomerSchema = new mongoose.Schema<ICustomerModel>({
    firstName: {
        type: String,
        required: [true, "Missing FirstName"],
        trim: true,
        minlength: [2, "FirstName too short"],
        maxlength: [10, "FirstName too long"]
    },
    lastName: {
        type: String,
        required: [true, "Missing LastName"],
        trim: true,
        minlength: [2, "LastName too short"],
        maxlength: [10, "LastName too long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true,
        trim: true,
        match: [/^05\d{8}$/, "Please enter a valid phone number"]
    },
});