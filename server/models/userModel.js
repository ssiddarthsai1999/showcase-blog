import mongoose from "mongoose";
// import productModel from "./productModel.js";
import moment from "moment-timezone";

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: false },
        lastname: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        dateOfBirth: { type: Date, required: false },
        phoneNumber: { type: String, required: false },
        signUpMethod: { type: String, default:"normal", enum: ["google", "normal"] },
        isVerified: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
        createdAt: {
            type: Date,
            default: new Date(),
        },

        deliveryAddress: {
            street: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false },
            country: { type: String, required: false },
            apartment: { type: String, required: false },
            floor: { type: String, required: false },
        },

        // payment: {
        //     method: {
        //         type: String,
        //         enum: ["credit", "debit", "upi", "gpay", "paypal"],
        //         required: false,
        //     },
        //     cardNumber: { type: String, required: false },
        //     cardHolder: { type: String, required: false },
        //     expiration: {
        //         month: { type: String, required: false },
        //         year: { type: String, required: false },
        //     },
        //     upiId: { type: String, required: false },
        //     gpayId: { type: String, required: false },
        //     paypalEmail: { type: String, required: false },
        // },
    },
    { timestamps: false }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
