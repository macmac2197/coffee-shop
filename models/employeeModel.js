import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email_address: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format.",
      },
    },
    phone_number: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return /^[89]\d{8}$/.test(value);
        },
        message: "Invalid phone number format.",
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    cafe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cafe",
      validate: {
        validator: (value) => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid ObjectId format",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
