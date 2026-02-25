import mongoose from "mongoose";
import { CustomerSchema, ICustomerModel } from "./customer-model";
import { AddressSchema, IAddressModel } from "./address-model";

export enum UserRoles {
    admin = "admin",
    user = "user"
}

export interface IUserModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    customer: ICustomerModel;
    role: String; 
    password: string;
    address: IAddressModel
}

export const UserSchema = new mongoose.Schema<IUserModel>({
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
        type: CustomerSchema,
        required: [true, "Customer information is required"]
    },
    address: {
        type: AddressSchema,
        required: [true, "User address is required"]
    }
}, {
    versionKey: false
});


export const UserModel = mongoose.model<IUserModel>("UserModel", UserSchema, "Users");