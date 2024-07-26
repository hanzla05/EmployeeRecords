import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    departmentId: { type: Number, required: true, unique: true },
    departmentName: { type: String, required: true }
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
