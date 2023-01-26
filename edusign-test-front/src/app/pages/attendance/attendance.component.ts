import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Student } from 'src/app/types/student';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SignatureDialogComponent } from 'src/app/components/SignatureDialog/signature-dialog.component';
import { CommentDialogComponent } from 'src/app/components/CommentDialog/comment-dialog.component';
import { Attendance } from 'src/app/types/attendance';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'state', 'comment', 'actions'];
  public dataSource: Student[] = [];

  constructor(private attendanceService: AttendanceService,
    public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    //TODO: Add loader/error handling
    this.fetchAttendance()
  }


  fetchAttendance() {
    this.attendanceService.getAttendance().subscribe((data: Attendance) => {
      this.dataSource = data.students;
    });
  }

  showSignature(student: Student) {
    const dialogRef = this.dialog.open(SignatureDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        student.signature = result;
        this.attendanceService.updateStudentForAttendance(student.id, student).subscribe((data: Student) => {
          this.fetchAttendance();
        });
      }
    });
  }
  
  addComment (student: Student) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        student.comment = result;
        this.attendanceService.updateStudentForAttendance(student.id, student).subscribe((data: Student) => {
          this.fetchAttendance();
        });
      }
    });

  }

  markAsMissing (student: Student) {
    student.presenceState = false;
    student.signature = undefined;
    student.signatureTimestamp = undefined;

    this.attendanceService.updateStudentForAttendance(student.id, student).subscribe((data: Student) => {
      this.fetchAttendance();
    });
  }


}
