import mongoose from 'mongoose';

const employeeDepartmentSchema = new mongoose.Schema({
    employeeDeptId: { type: Number, required: true, unique: true },
    employeeId: { type: Number, required: true },
    departmentId: { type: Number, required: true },
    deptStart: { type: Date, required: true }
});

const EmployeeDepartment = mongoose.model('EmployeeDepartment', employeeDepartmentSchema);
export default EmployeeDepartment;
