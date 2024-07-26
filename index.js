import express from 'express';
import mongoose from 'mongoose';
import EmployeeRouter from './routes/Employees.mjs';

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/EmployeeManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('connected', () => console.log('Database Connected'));
connection.on('error', (error) => console.log('Database connection error', error));

app.use('/employees', EmployeeRouter);

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
