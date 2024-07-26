import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    employeeId: { type: Number, required: true, unique: true },
    employeeName: { type: String, required: true },
    salary: { type: Number, required: true },
    managerId: { type: Number, required: true },
    position: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
