"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import mongoose from "mongoose"

export const initiate = async (amount, to_username, paymentform) => {
    await mongoose.connect("mongodb://localhost:27017/details")
    //fetch user razorpaysecret and razorpayid from database
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret
    const key_Id = user.razorpayid
    var instance = new Razorpay({ key_id: key_Id, key_secret: secret })

    instance.orders.create({
        amount: 5000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })
    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR"
    }
    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment in database
    await Payment.create({
        oid: x.id,
        amount: amount,
        to_username: to_username,
        name: paymentform.name,
        message: paymentform.message,
        status: "pending"
    })
    return x
}

export const fetchuser = async (id) => {
    await mongoose.connect("mongodb://localhost:27017/details")
    let u = await User.findOne({ username: id })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (id) => {
    await mongoose.connect("mongodb://localhost:27017/details");

    // Fetch only successful payments
    let payments = await Payment.find({ to_username: id, status: "success" })
        .sort({ amount: -1 })
        .lean();

    payments = payments.map(payment => ({
        ...payment,
        _id: payment._id.toString()
    }));
    return payments;
}

export const updateProfile = async (data, oldID) => {
    await mongoose.connect("mongodb://localhost:27017/details");

    let newdata = {};
    for (let [key, value] of data.entries()) {
        newdata[key] = value;
    }

    if (newdata.username && newdata.username !== oldID) {
        let existingUser = await User.findOne({ username: newdata.username });
        if (existingUser) {
            return { error: "Username already exists" };
        }

        await Payment.updateMany({ to_username: oldID }, { to_username: newdata.username });
    } else {
        delete newdata.username;
    }

    let result = await User.updateOne({ email: newdata.email }, { $set: newdata });

    if (result.modifiedCount === 0) {
        return { error: "No changes made or user not found" };
    }
    return { success: "Profile and payments updated successfully" };
}
