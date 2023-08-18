import { Model, models, model } from "mongoose";
import { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  image: string;
  recipes: Schema.Types.ObjectId[];
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  password: { type: String },
  image: { type: String },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;
