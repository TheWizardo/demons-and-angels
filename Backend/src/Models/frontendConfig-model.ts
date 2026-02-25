import mongoose from "mongoose";

export interface IFrontendConfig extends mongoose.Document{
  _id: mongoose.Types.ObjectId;
  max_physical: number;

  international_phone: string;
  email: string;

  showBanner: boolean;
  banner_message: string;

  shipping_cost: number;
}

export const FrontendConfigSchema = new mongoose.Schema<IFrontendConfig>({
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
      validator: (v: string) =>
        /^\+[1-9]\d{1,14}$/.test(v), // E.164 format
      message: (props: any) =>
        `${props.value} is not a valid international phone number`,
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
    required: function (this: IFrontendConfig) {
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
},
  { timestamps: true }
);

export const FrontendConfig = mongoose.model<IFrontendConfig>("FrontendConfig", FrontendConfigSchema, "FrontendConfig");