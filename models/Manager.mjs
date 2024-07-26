import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
    managerId: { type: Number, required: true, unique: true },
    managerName: { type: String, required: true },
    managerEmail: { type: String, required: true }
});

const Manager = mongoose.model('Manager', managerSchema);
export default Manager;
