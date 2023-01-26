"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const express_1 = require("express");
const attendance_service_1 = require("./attendance.service");
exports.AttendanceController = (0, express_1.Router)();
const service = new attendance_service_1.AttendanceService();
exports.AttendanceController.get('/', (req, res) => {
    const attendance = service.getOne();
    if (!attendance) {
        throw "Attendance not found";
    }
    return res
        .status(200)
        .json(attendance);
});
exports.AttendanceController.patch('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    //TODO : Add validator/authorizer
    if (!Number.isInteger(id)) {
        throw "ID must be an integer";
    }
    const updatedStudent = service.patchStudent(req.body, id);
    return res
        .status(200)
        .json(updatedStudent);
});
//# sourceMappingURL=attendance.controller.js.map