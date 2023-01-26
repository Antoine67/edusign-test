"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const fs = __importStar(require("fs"));
class AttendanceService {
    attendance;
    constructor() {
        const json = fs.readFileSync(process.env.dbPath || "db.json");
        //TODO Validate json format/data
        this.attendance = JSON.parse(json.toString());
    }
    getOne() {
        return this.attendance;
    }
    patchStudent(studentData, studentId) {
        const index = this.attendance.students.findIndex(s => s.id === studentId);
        if (index === -1) {
            throw "Student not found";
        }
        if (studentData.signature) {
            studentData.signatureTimestamp = new Date().toISOString();
            studentData.presenceState = true;
        }
        studentData.dateUpdated = new Date().toISOString();
        this.attendance.students[index] = { ...this.attendance.students[index], ...this.attendance.students };
        return this.attendance.students[index];
    }
}
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map