const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// GET - get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Post - Add a new employee
router.post("/", async (req, res) => {
    const { name, email, dob, address, photo } = req.body;

    const age = calculateAge(dob);

    const newEmployee = new Employee({
        name,
        age,
        email,
        dob,
        address,
        photo,
    });

    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT - Update an employee
router.put("/:id", async (req, res) => {
    const { name, age, email, dob, address, photo } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, age, email, dob, address, photo },
            { new: true }
        );
        if (!updatedEmployee)
            return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Delete an employee
router.delete("/:id", async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee)
            return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
