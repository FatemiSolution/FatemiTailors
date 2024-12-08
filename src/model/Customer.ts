import mongoose, { Schema, Document } from "mongoose";
import { Measurement, MeasurementSchema } from "./Measurement";

export interface Customer extends Document {
    name: string;
    sirname: string;
    mobileNo: number;
    email: string;
    orders: mongoose.Schema.Types.ObjectId[];
    measurements: Measurement;
    Notes: string;
}

export const CustomerSchema: Schema<Customer> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    sirname: {
        type: String,
        required: [true, "Sirname is required"],
    },
    mobileNo: {
        type: Number,
        required: [true, "Mobile number is required"],
        match: [/^\+?[0-9]{10,15}$/g, "Please enter a valid mobile number"],
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please enter a valid email address"],
    },
    orders: {
        type: [mongoose.Types.ObjectId],
        ref:"Order"
    },
    measurements: {
        type: MeasurementSchema,
        required: false, // Optional if measurements are not always available.
    },
    Notes: {
        type: String,
        default: "", // Default to an empty string for consistency.
    },
});

const CustomerModel = (mongoose.models.Customer as mongoose.Model<Customer>) || 
                      mongoose.model<Customer>("Customer", CustomerSchema);

export default CustomerModel;
