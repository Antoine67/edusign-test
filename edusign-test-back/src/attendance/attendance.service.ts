import { Attendance } from "../types/attendance";
import * as fs from "fs";
import { Student } from "../types/student";
import axios from "axios";
import FormData from "form-data";

export class AttendanceService {
  private attendance: Attendance;

  constructor() {
    const json = fs.readFileSync(process.env.dbPath || "db.json");

    //TODO Validate json format/data
    const jsonObject: any = JSON.parse(json.toString()).attendanceSheet;
    this.attendance = {
      id: jsonObject.ID,
      name: jsonObject.NAME,
      date_created: jsonObject.DATE_CREATED,
      date_updated: jsonObject.DATE_UPDATED,
      start: jsonObject.START,
      end: jsonObject.END,
      students: jsonObject.STUDENTS.map((s: any) => {
        return {
          id: s.id,
          presenceState: s.presenceState,
          signatureTimestamp: s.signatureTimestamp,
          signature: s.signature,
          comment: s.comment,
          dateCreated: s.dateCreated,
          dateUpdated: s.dateUpdated,
          firstName: s.FIRSTNAME,
          lastName: s.LASTNAME,
        };
      }),
    };
  }

  getOne(): Attendance {
    return this.attendance;
  }

  async updateStudent(
    newStudentData: Student,
    studentId: number
  ): Promise<Student> {
    const index = this.attendance.students.findIndex((s) => s.id === studentId);

    if (index === -1) {
      throw "Student not found";
    }

    newStudentData.id = studentId;

    if (newStudentData.signature) {
      newStudentData.signatureTimestamp = new Date().toISOString();
      newStudentData.presenceState = true;

      // const imgurClientId = "e26a46279943ffa";
      // const image =  newStudentData.signature; 
      // axios
      //   .post(
      //     "https://api.imgur.com/3/image",
      //     {
      //       image: image,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Client-ID ${imgurClientId}`,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     console.log(response.data);
      //     newStudentData.signature = response.data.data.link;
      //   })
      //   .catch((error) => {
      //     console.log(error.response.data);
      //   });
    }

    newStudentData.dateUpdated = new Date().toISOString();
    this.attendance.students[index] = newStudentData;
    return this.attendance.students[index];
  }
}
