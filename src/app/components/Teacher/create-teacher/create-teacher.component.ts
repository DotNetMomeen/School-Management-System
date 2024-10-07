import { Component } from '@angular/core';
import { Subject } from '../../../Models/subject';
import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Gender } from '../../../Models/gender';

@Component({
  selector: 'app-create-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.css',
})
export class CreateTeacherComponent {
  subjectList: Subject[] = [];
  gender: Gender[] = [];
  teacherImage: File = null!;
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  teacherForm: FormGroup = new FormGroup({
    teacherId: new FormControl(undefined, Validators.required),
    teacherName: new FormControl(undefined, Validators.required),
    dateOfBirth: new FormControl(undefined),
    phone: new FormControl(undefined, Validators.required),
    qualification: new FormControl(undefined, Validators.required),
    joinDate: new FormControl(undefined, Validators.required),
    genderId: new FormControl(undefined),

    subList: new FormArray([]),
  });
  get subListArray() {
    return this.teacherForm.controls['subList'] as FormArray;
  }
  addSub() {
    this.subListArray.push(
      new FormGroup({
        subjectId: new FormControl(undefined, Validators.required),
      })
    );
  }
  removeSubList(index: number) {
    if (this.subListArray.controls.length > 0)
      this.subListArray.removeAt(index);
  }
  ngOnInit() {
    this.dataSvc.getSubjectList().subscribe((result) => {
      this.subjectList = result;
      console.log(result);
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });

    this.addSub();
  }
  onFileSelected(event: any) {
    this.teacherImage = event.target.files[0];
  }
  insertTeacher() {
    var formData = new FormData();
    formData.append(
      'SubjectStringify',
      JSON.stringify(this.teacherForm.get('subList')!.value)
    );
    formData.append('teacherName', this.teacherForm.get('teacherName')!.value);
    formData.append('dateOfBirth', this.teacherForm.get('dateOfBirth')!.value);
    formData.append('phone', this.teacherForm.get('phone')!.value);
    formData.append(
      'qualification',
      this.teacherForm.get('qualification')!.value
    );
    formData.append('joinDate', this.teacherForm.get('joinDate')!.value);
    formData.append('genderId', this.teacherForm.get('genderId')!.value);

    formData.append('imagePath', this.teacherImage, this.teacherImage.name);

    this.dataSvc.postTeacherSubject(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewTeacher']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
