import mongoose from "mongoose";

export interface IAddressModel extends mongoose.Document {
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
}

export const AddressSchema = new mongoose.Schema<IAddressModel>({
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
