import mongoose, { Schema, Document } from "mongoose";

export interface Measurement extends Document {
    length: number; // Corrected field name
    customer: mongoose.Types.ObjectId; // Reference to Customer by ID
    createdAt: Date;
    updatedAt: Date;
}

export const MeasurementSchema: Schema<Measurement> = new Schema(
    {
        length: {
            type: Number,
            required: [true, "Length is required"], // Makes the field mandatory
            min: [0, "Length cannot be negative"], // Example validation
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer", // Reference to Customer model
            required: [true, "Customer is required"],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// // Create the Measurement model
// const MeasurementModel =
//     (mongoose.models.Measurement as mongoose.Model<Measurement>) ||
//     mongoose.model<Measurement>("Measurement", MeasurementSchema);

// export default MeasurementModel;
