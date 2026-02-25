import { Customer } from "./customer-model";
import { Address } from "./address-model";

export enum UserRoles {
    admin = "admin",
    user = "user"
}

export interface User{
    _id: string;
    customer: Customer;
    role: String; 
    password: string;
    address: Address
}