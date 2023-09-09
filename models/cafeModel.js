import mongoose from "mongoose";

const cafeSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        validate: {
          validator: (value) => {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid ObjectId format",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cafe = mongoose.model("Cafe", cafeSchema);

export default Cafe;
