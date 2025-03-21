import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PaymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    to_username: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String},
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
    Done: { type: Boolean, default: false }
});

export default mongoose.models.Payment || model('Payment', PaymentSchema);  