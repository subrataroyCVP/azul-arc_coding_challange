const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            optional: true,
        },
        photo: {
            type: String,
            optional: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Employee", employeeSchema);
