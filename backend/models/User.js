import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },

    department: String,
    phone: String,
    address: String,
    profilePicture: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);