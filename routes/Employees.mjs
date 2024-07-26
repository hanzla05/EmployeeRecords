import express from 'express';
import Employee from '../models/Employee.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ message: "Employee added successfully", employee });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employeeId = parseInt(req.params.id);

        const employeeData = await Employee.aggregate([
            { $match: { employeeId: employeeId } },
            {
                $lookup: {
                    from: 'managers',
                    localField: 'managerId',
                    foreignField: 'managerId',
                    as: 'manager'
                }
            },
            { $unwind: '$manager' },
            {
                $lookup: {
                    from: 'employeedepartments',
                    localField: 'employeeId',
                    foreignField: 'employeeId',
                    as: 'departments'
                }
            },
            { $unwind: '$departments' },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'departments.departmentId',
                    foreignField: 'departmentId',
                    as: 'departments.department'
                }
            },
            { $unwind: '$departments.department' },
            {
                $group: {
                    _id: '$employeeId',
                    employeeId: { $first: '$employeeId' },
                    employeeName: { $first: '$employeeName' },
                    salary: { $first: '$salary' },
                    position: { $first: '$position' },
                    dateOfBirth: { $first: '$dateOfBirth' },
                    address: { $first: '$address' },
                    manager: { $first: '$manager' },
                    departments: { $push: '$departments' }
                }
            },
            {
                $project: {
                    _id: 0,
                    employeeId: 1,
                    employeeName: 1,
                    salary: 1,
                    position: 1,
                    dateOfBirth: 1,
                    address: 1,
                    manager: {
                        managerName: 1,
                        managerEmail: 1
                    },
                    departments: {
                        employeeDeptId: 1,
                        deptStart: 1,
                        department: '$departments.department.departmentName'
                    }
                }
            }
        ]);

        res.status(200).json({ message: "Employee data retrieved successfully", employeeData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
