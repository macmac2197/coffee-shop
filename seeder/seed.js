import mongoose from "mongoose";
import Employee from "../models/employeeModel.js";
import Cafe from "../models/cafeModel.js";
import { generateUniqueIdWithPrefix } from "../utils/util.js";
import { v4 as uuidv4 } from "uuid";

// connect to mongoDB database
mongoose.connect(
  "mongodb+srv://arjeldev:arjeldev@cluster0.oi1bo3e.mongodb.net/cafe?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// check for successful db connection
const dbconn = mongoose.connection;
dbconn.on("error", console.error.bind(console, "MongoDB connection error:"));
dbconn.once("open", () => {
  console.log("Connected to MongoDB");
});

const cafeSeedData = [
  {
    id: uuidv4(),
    name: "Coffee Project",
    description: "This is a coffee shop.",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStarbucks&psig=AOvVaw3wqrjs1URqjkoSiBqWfhQX&ust=1694301315158000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLiBsbGSnIEDFQAAAAAdAAAAABAE",
    location: "Taguig",
  },
  {
    id: uuidv4(),
    name: "Starbucks",
    description: "This is a coffee shop.",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStarbucks&psig=AOvVaw3wqrjs1URqjkoSiBqWfhQX&ust=1694301315158000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLiBsbGSnIEDFQAAAAAdAAAAABAE",
    location: "Taguig",
  },
  {
    id: uuidv4(),
    name: "Tim Hortons",
    description: "This is a coffee shop.",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStarbucks&psig=AOvVaw3wqrjs1URqjkoSiBqWfhQX&ust=1694301315158000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLiBsbGSnIEDFQAAAAAdAAAAABAE",
    location: "Taguig",
  },
  {
    id: uuidv4(),
    name: "The Coffee Bean",
    description: "This is a coffee shop.",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStarbucks&psig=AOvVaw3wqrjs1URqjkoSiBqWfhQX&ust=1694301315158000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLiBsbGSnIEDFQAAAAAdAAAAABAE",
    location: "Taguig",
  },
  {
    id: uuidv4(),
    name: "Starbucks",
    description: "This is a coffee shop.",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStarbucks&psig=AOvVaw3wqrjs1URqjkoSiBqWfhQX&ust=1694301315158000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLiBsbGSnIEDFQAAAAAdAAAAABAE",
    location: "Pasig",
  },
  {
    id: uuidv4(),
    name: "Tim Hortons",
    description: "This is a coffee shop.",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStarbucks&psig=AOvVaw3wqrjs1URqjkoSiBqWfhQX&ust=1694301315158000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLiBsbGSnIEDFQAAAAAdAAAAABAE",
    location: "Pasig",
  },
  {
    id: uuidv4(),
    name: "The Coffee Bean",
    description: "This is a coffee shop.",
    logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStarbucks&psig=AOvVaw3wqrjs1URqjkoSiBqWfhQX&ust=1694301315158000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLiBsbGSnIEDFQAAAAAdAAAAABAE",
    location: "Pasig",
  },
];

const employeeSeedData = [
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee SB 1",
    email_address: "employeesb1@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Starbucks",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee SB 2",
    email_address: "employeesb2@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Starbucks",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee SB 3",
    email_address: "employeesb3@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Starbucks",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee SB 4",
    email_address: "employeesb4@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Starbucks",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee TH 1",
    email_address: "employeeth1@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Tim Hortons",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee TH 2",
    email_address: "employeeth2@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Tim Hortons",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee TH 3",
    email_address: "employeeth3@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Tim Hortons",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee CP 1",
    email_address: "employeecp1@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Coffee Project",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee CP 2",
    email_address: "employeecp2@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "Coffee Project",
  },
  {
    id: generateUniqueIdWithPrefix("UI", 7),
    name: "Employee TCB 1",
    email_address: "employeetcb1@gmail.com",
    phone_number: "912345678",
    gender: "Male",
    cafe: "The Coffee Bean",
  },
];

const seedDatabase = async () => {
  try {
    // clear existing data (optional)
    await Cafe.deleteMany({});
    await Employee.deleteMany({});

    console.log("Existing data cleared.");

    // insert cafe seed data
    const cafes = await Cafe.insertMany(cafeSeedData);
    console.log(`${cafes.length} cafes inserted.`);

    // map cafe names to cafe IDs
    const cafeMap = {};
    cafes.forEach((cafe) => {
      // only for location is eaual to Taguig
      if (cafe.location === "Taguig") {
        cafeMap[cafe.name] = cafe._id;
      }
    });

    // update employeeSeedData to use actual cafe ObjectId references
    const employeesWithCafeIds = employeeSeedData.map((employee) => ({
      ...employee,
      cafe: cafeMap[employee.cafe],
    }));

    // insert employee seed data with references to cafes
    const employees = await Employee.insertMany(employeesWithCafeIds);
    console.log(`${employees.length} employee inserted.`);

    // push to cafe's employee
    for (const employee of employees) {
      await Cafe.findByIdAndUpdate(
        employee.cafe,
        { $push: { employees: employee._id } },
        { new: true }
      );
    }

    console.log("Database seeded successfully. Edi Wow!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
