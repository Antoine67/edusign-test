import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { AttendanceController } from './attendance/attendance.controller'


dotenv.config();

const port = process.env.PORT || 3000;

const app = express()
app.use(express.json())

app.use(cors())

app.use('/attendance', AttendanceController)

app.listen(port, () =>  {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})