import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Student } from '../../../Models/student';
import { StudentGuardian } from '../../../Models/student-guardian';
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyServiceService } from '../../../Services/notify.service';

@Component({
  selector: 'app-edit-guardian',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-guardian.component.html',
  styleUrl: './edit-guardian.component.css',
})
export class EditGuardianComponent {
  studentList: Student[] = [];

  studentGuardian: StudentGuardian = {
    guardianId: undefined,
    guardianName: undefined,

    phone: undefined,

    email: undefined,
    nidNumber: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}
  guardianForm: FormGroup = new FormGroup({
    guardianId: new FormControl(undefined, Validators.required),
    guardianName: new FormControl(undefined, Validators.required),

    phone: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, Validators.required),
    nidNumber: new FormControl(undefined, Validators.required),

    studList: new FormArray([]),
  });
  get studListArray() {
    return this.guardianForm.controls['studList'] as FormArray;
  }
  addStud(item?: Student) {
    if (item) {
      this.studListArray.push(
        new FormGroup({
          studentId: new FormControl(item.studentId, Validators.required),
        })
      );
    } else {
      this.studListArray.push(
        new FormGroup({
          studentId: new FormControl(undefined, Validators.required),
        })
      );
    }
  }
  removeStudList(index: number) {
    if (this.studListArray.controls.length > 0)
      this.studListArray.removeAt(index);
  }
  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getStudentGuardianById(id).subscribe((x) => {
      this.studentGuardian = x;

      this.guardianForm.patchValue(this.studentGuardian);

      this.studentGuardian.studentsList?.forEach((item) => {
        this.addStud(item);
      });
    });

    this.dataSvc.getStudentList().subscribe((result) => {
      this.studentList = result;
    });
  }

  updateGuardian() {
    var formData = new FormData();
    formData.append(
      'studentStringify',
      JSON.stringify(this.guardianForm.get('studList')!.value)
    );
    formData.append('guardianId', this.guardianForm.get('guardianId')!.value);
    formData.append(
      'guardianName',
      this.guardianForm.get('guardianName')!.value
    );

    formData.append('phone', this.guardianForm.get('phone')!.value);
    formData.append('email', this.guardianForm.get('email')!.value);
    formData.append('nidNumber', this.guardianForm.get('nidNumber')!.value);

    this.dataSvc.updateStudentGuardian(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewGuardian']);
        this.notifySvc.success('Data update successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}
