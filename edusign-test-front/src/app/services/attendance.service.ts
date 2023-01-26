import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatchStudentData, Student } from '../types/student';
import { Observable } from 'rxjs';
import { Attendance } from '../types/attendance';

const API_URI = 'http://localhost:3000';

@Injectable()
export class AttendanceService {
  constructor(private http: HttpClient) { 

  }
    getAttendance() : Observable<Attendance> {
        return this.http.get<Attendance>(API_URI +'/attendance');
    }

    updateStudentForAttendance(id: number, studentUpdateData: PatchStudentData) : Observable<Student> {
        return this.http.put<Student>(API_URI +'/attendance/students/' + id, studentUpdateData);
    }
}