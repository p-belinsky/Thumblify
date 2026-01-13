import mongoose from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    plan: "basic" | "pro" | "enterprise" | "free" | null;
    credits: number;
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    plan: { type: String, enum: ["basic", "pro", "enterprise", "free"], default: "free" },
    credits: { type: Number, default: 3 },

}, { timestamps: true });


const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;