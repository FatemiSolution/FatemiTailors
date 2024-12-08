import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
    orderDate: Date;
    deliveryDate: Date;
    customer: mongoose.Types.ObjectId[]; // Array of Customer IDs
    status: "delivered" | "inprocess" | "completed"; // Enum for status
    advanceAmount: number;
    paid: boolean;
    kurta: number;
    saya: number;
    izaar: number;
    embroidery: Record<string, any>; // Key-value object for Embroidery
    pants: number;
    makhi: Record<string, any>; // Key-value object for Makhi
    notes: string;
    price: number;
    total: number;
}

export const OrderSchema: Schema<Order> = new Schema(
    {
        orderDate: {
            type: Date,
            default: Date.now, // Default to current date
        },
        deliveryDate: {
            type: Date,
            required: [true, "Delivery date is required"], // Custom date
        },
        customer: {
            type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
            ref: "Customer", // Reference to Customer model
            required: [true, "Customer is required"],
        },
        status: {
            type: String,
            enum: ["delivered", "inprocess", "completed"], // Allowed values
            default: "inprocess",
            required: [true, "Order status is required"],
        },
        advanceAmount: {
            type: Number,
            default: 0, // Default to 0
        },
        paid: {
            type: Boolean,
            default: false, // Default to unpaid
        },
        kurta: {
            type: Number,
            default: 0,
        },
        saya: {
            type: Number,
            default: 0,
        },
        izaar: {
            type: Number,
            default: 0,
        },
        embroidery: {
            type: Map, // Use Map for key-value pairs
            of: mongoose.Schema.Types.Mixed, // Accepts any type of value
            default: {},
        },
        pants: {
            type: Number,
            default: 0,
        },
        makhi: {
            type: Map, // Use Map for key-value pairs
            of: mongoose.Schema.Types.Mixed,
            default: {},
        },
        notes: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        total: {
            type: Number,
            required: [true, "Total amount is required"],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

const OrderModel =
    (mongoose.models.Order as mongoose.Model<Order>) ||
    mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
