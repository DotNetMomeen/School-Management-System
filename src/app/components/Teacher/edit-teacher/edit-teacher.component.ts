import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from '../../../Models/subject';
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherSubject } from '../../../Models/teacher-subject';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Gender } from '../../../Models/gender';

@Component({
  selector: 'app-edit-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-teacher.component.html',
  styleUrl: './edit-teacher.component.css',
})
export class EditTeacherComponent {
  subjectList: Subject[] = [];
  gender: Gender[] = [];
  teacherImage: File = null!;

  teacherSubject: TeacherSubject = {
    teacherId: undefined,
    teacherName: undefined,
    dateOfBirth: undefined,
    phone: undefined,
    teacherImage: undefined,
    qualification: undefined,
    genderId: undefined,
    joinDate: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}
  teacherForm: FormGroup = new FormGroup({
    teacherId: new FormControl(undefined, Validators.required),
    teacherName: new FormControl(undefined, Validators.required),
    dateOfBirth: new FormControl(undefined),
    phone: new FormControl(undefined, Validators.required),
    qualification: new FormControl(undefined, Validators.required),
    genderId: new FormControl(undefined, Validators.required),
    joinDate: new FormControl(undefined, Validators.required),
    subList: new FormArray([]),
  });
  get subListArray() {
    return this.teacherForm.controls['subList'] as FormArray;
  }
  addSub(item?: Subject) {
    if (item) {
      this.subListArray.push(
        new FormGroup({
          subjectId: new FormControl(item.subjectId, Validators.required),
        })
      );
    } else {
      this.subListArray.push(
        new FormGroup({
          subjectId: new FormControl(undefined, Validators.required),
        })
      );
    }
  }
  removeSubList(index: number) {
    if (this.subListArray.controls.length > 0)
      this.subListArray.removeAt(index);
  }
  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getTeacherSubjectById(id).subscribe((x) => {
      this.teacherSubject = x;

      this.teacherForm.patchValue(this.teacherSubject);

      if (x.dateOfBirth) {
        const dateOfBirth = new Date(x.dateOfBirth);
        const formattedDateOfBirth = dateOfBirth.toISOString().substring(0, 10);

        this.teacherForm.patchValue({
          dateOfBirth: formattedDateOfBirth,
        });
      }

      this.teacherSubject.subjectsList?.forEach((item) => {
        this.addSub(item);
      });
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });

    this.dataSvc.getSubjectList().subscribe((result) => {
      this.subjectList = result;
    });
  }
  onFileSelected(event: any) {
    this.teacherImage = event.target.files[0];
  }
  updateTeacher() {
    var formData = new FormData();
    formData.append(
      'subjectStringify',
      JSON.stringify(this.teacherForm.get('subList')!.value)
    );
    formData.append('teacherId', this.teacherForm.get('teacherId')!.value);
    formData.append('teacherName', this.teacherForm.get('teacherName')!.value);
    formData.append('dateOfBirth', this.teacherForm.get('dateOfBirth')!.value);
    formData.append('phone', this.teacherForm.get('phone')!.value);
    formData.append(
      'qualification',
      this.teacherForm.get('qualification')!.value
    );
    formData.append('joinDate', this.teacherForm.get('joinDate')!.value);
    if (this.teacherImage) {
      formData.append('imagePath', this.teacherImage, this.teacherImage.name);
    }
    this.dataSvc.updateTeacherSubject(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewTeacher']);
        this.notifySvc.success('Data update successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}
