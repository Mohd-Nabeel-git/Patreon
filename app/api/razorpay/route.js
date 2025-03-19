import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import mongoose from "mongoose";
import crypto from "crypto";
import User from "@/models/User";

export async function POST(request) {
    await mongoose.connect("mongodb://localhost:27017/details");

    let body = await request.formData();  
    body = Object.fromEntries(body);      

    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ success: false, message: "orderID not found" });
    }

    //Fetch user razorpaysecret and razorpayid from database
    let user = await User.findOne({ username: p.to_username });
    const secret = user.razorpaysecret;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(body.razorpay_order_id + "|" + body.razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature === body.razorpay_signature) {
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { status: "success", Done: true },
            { new: true }
        );
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/${updatedPayment.to_username}?paymentdone=true`);
    } else {
        return NextResponse.json({ success: false, message: "Payment verification failed" });
    }
}
