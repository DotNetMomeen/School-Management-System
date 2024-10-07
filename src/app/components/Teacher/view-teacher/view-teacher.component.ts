import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';
import { Subject } from '../../../Models/subject';
import { TeacherSubject } from '../../../Models/teacher-subject';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
import { Gender } from '../../../Models/gender';

@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css',
})
export class ViewTeacherComponent {
  subjectList: Subject[] = [];
  teacherList: TeacherSubject[] = [];
  gender: Gender[] = [];
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getSubjectList().subscribe((result) => {
      this.subjectList = result;
      console.log(result);
    });

    this.dataSvc.getTeacherSubject().subscribe((x) => {
      this.teacherList = x;
      console.log(x);
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });
  }
  getSubName(id: any) {
    let data = this.subjectList.find((x) => x.subjectId == id);
    return data ? data.subjectName : '';
  }
  getGenderName(id: any) {
    let data = this.gender.find((x) => x.genderId == id);
    return data ? data.genderName : '';
  }
  confirmDelete(item: TeacherSubject) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteTeacherSubject(Number(item.teacherId)).subscribe(
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
