import mongoose from "mongoose";
import Cafe from "../models/cafeModel.js";
import Employee from "../models/employeeModel.js";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash/isEmpty.js";

// GET Request
// get all cafes
export const getCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find().populate("employees");

    res.status(200).json(cafes);
  } catch (error) {
    res.status(404).json(error);
  }
};

// filter cafe by location
export const filterCafeByLocation = async (req, res) => {
  const { location } = req.query;

  try {
    let cafes = [];

    // name of fields in the collection to return
    const aggProject = {
      $project: {
        id: 1,
        name: 1,
        description: 1,
        logo: 1,
        location: 1,
        employees: { $size: "$employees" },
      },
    };

    // check if location is empty and will return all available cafes
    if (isEmpty(location)) {
      cafes = await Cafe.aggregate([aggProject]);
    } else {
      const cafeLocation = new RegExp(location, "i"); //remove case-insensitive
      cafes = await Cafe.aggregate([
        {
          $match: {
            location: cafeLocation,
          },
        },
        aggProject,
      ]);
    }

    res.status(200).json(cafes);
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

// POST Request
// create new cafe
export const createCafe = async (req, res) => {
  const cafe = req.body;
  const cafeData = {
    ...cafe,
    id: uuidv4(),
  };
  const saveCafe = new Cafe(cafeData);

  try {
    await saveCafe.save();

    res.status(201).json({
      message: "New record successfully created",
      employee: saveCafe,
    });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

// PUT Request
// update existing cafe by ID
export const updateCafe = async (req, res) => {
  const { id } = req.params;
  const cafe = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ status: 404, message: "Record not found!" });
  }

  try {
    const updatedCafe = await Cafe.findByIdAndUpdate(id, cafe, { new: true });

    res.status(201).json({
      message: "Record successfully updated",
      cafe: updatedCafe,
    });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

// DELETE Request
// delete an existing cafe from the collection using their ID
export const deleteCafe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ status: 404, message: "Record not found!" });
  }

  try {
    await Cafe.findByIdAndDelete(id);

    // delete all employees associated with the deleted cafe
    await Employee.deleteMany({ cafe: id });

    res.status(201).json({
      message: "Record successfully deleted",
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};
