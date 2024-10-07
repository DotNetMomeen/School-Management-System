import { Component } from '@angular/core';
import { Student } from '../../../Models/student';
import { StudentGuardian } from '../../../Models/student-guardian';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-guardian',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-guardian.component.html',
  styleUrl: './view-guardian.component.css',
})
export class ViewGuardianComponent {
  studentList: Student[] = [];
  guardianList: StudentGuardian[] = [];

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getStudentList().subscribe((result) => {
      this.studentList = result;
      console.log(result);
    });

    this.dataSvc.getStudentGuardian().subscribe((x) => {
      this.guardianList = x;
      console.log(x);
    });
  }
  getStudName(id: any) {
    let data = this.studentList.find((x) => x.studentId == id);
    return data ? `${data.studentFName} ${data.studentLName}` : ''; 
  }

  confirmDelete(item: StudentGuardian) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteStudentGuardian(Number(item.guardianId)).subscribe(
            (x) => {
              this.notifySvc.success('Data Deleted successfully!!', 'DISMISS');
            },
            (err) => {
              this.notifySvc.fail('Data Delete failed!!', 'DISMISS');
            }
          );
      });
  }
}
