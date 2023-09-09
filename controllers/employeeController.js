import mongoose from "mongoose";
import Employee from "../models/employeeModel.js";
import Cafe from "../models/cafeModel.js";
import { generateUniqueIdWithPrefix } from "../utils/util.js";
import { ObjectId } from "bson";

// GET Request
// get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("cafe");

    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

// filter employees by cafe
export const getEmployeesByCafe = async (req, res) => {
  const { cafe } = req.query;

  // name of fields in the collection to return
  const aggProject = {
    $project: {
      id: 1,
      name: 1,
      email_address: 1,
      phone_number: 1,
      createdAt: 1,
      days_worked: 1,
      name: "$cafeInfo.name",
    },
  };

  // add new field in the collection
  const aggAddFields = {
    $addFields: {
      // calculate the number of days worked
      days_worked: {
        $toInt: {
          $dateDiff: {
            startDate: "$createdAt",
            endDate: new Date(),
            unit: "day",
          },
        },
      },
    },
  };

  // replace the reference value in specific property
  const aggLookUp = {
    $lookup: {
      from: "caves",
      localField: "cafe",
      foreignField: "_id",
      as: "cafeInfo",
    },
  };

  try {
    const employees = await Employee.aggregate([
      {
        $match: {
          cafe: new ObjectId(cafe),
        },
      },
      aggLookUp,
      {
        $unwind: "$cafeInfo",
      },
      aggProject,
      aggAddFields,
      {
        $unset: "createdAt",
      },
      {
        $sort: { days_worked: -1 }, //sort by highest days of worked
      },
    ]);

    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

// POST Request
// create new employee
export const createEmployee = async (req, res) => {
  const employee = req.body;
  const employeeData = {
    ...employee,
    id: generateUniqueIdWithPrefix("UI", 7),
  };
  const saveEmployee = new Employee(employeeData);

  try {
    await saveEmployee.save();
    await Cafe.findByIdAndUpdate(
      saveEmployee.cafe,
      { $push: { employees: saveEmployee._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Successfully created new employee",
      employee: saveEmployee,
    });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

// PUT Request
// update existing employee by ID
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ status: 404, message: "Record not found!" });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
      new: true,
    });

    // push new employee if it doesn't exist
    await Cafe.updateOne(
      { _id: updatedEmployee.cafe },
      { $addToSet: { employees: updatedEmployee._id } }
    );

    res.status(201).json({
      message: "Record successfully updated",
      cafe: updatedEmployee,
    });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
};

// DELETE Request
// delete an existing employee from the collection using their ID
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ status: 404, message: "Record not found!" });
  }

  try {
    await Employee.findByIdAndDelete(id);

    res.status(201).json({
      message: "Record successfully deleted",
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};
