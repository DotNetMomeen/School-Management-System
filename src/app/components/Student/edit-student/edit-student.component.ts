import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css',
})
export class EditStudentComponent {
  route = inject(Router);
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  studentId: number = 0;

  getStudent() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      const id = params['id'];
      this.studentId = id;

      this.http
        .get('http://localhost:5028/api/Students/' + id)
        .subscribe((data: any) => {
          console.log(data);

          this.fName = data.studentFName;
          this.lName = data.studentLName;
          console.log(this.fName,this.lName);
          this.fatherName = data.fatherName;
          this.motherName = data.motherName;
          this.dob = data.dateOfBirth;
          this.image = data.image;
          this.birthCert = data.birthCertificateNumber;
          this.address = data.address;
          this.gender = data.genderId;
        });
    });
  }

  fName: string = '';
  lName: string = '';
  fatherName: string = '';
  motherName: string = '';
  dob: Date = new Date();
  gender: string = '';
  image: string = '';
  imagePath: any;
  address: string = '';
  birthCert: string = '';

  updateFile(event: Event){  
    //@ts-ignore  
    const file = event.target.files[0];  
    console.log(file); 
    this.imagePath=file;                 
     }
  
  async editStudent() {
    let formData: any = new FormData(); 
      formData.append("studentId",this.studentId)
      formData.append("studentFname", this.fName)
      formData.append("studentLName", this.lName)
      formData.append("fatherName", this.fatherName)
      formData.append("motherName", this.motherName)
      formData.append("dateOfBirth", this.dob)
      formData.append("image", null);
      formData.append("imagePath", this.imagePath)
      formData.append("birthCertificateNumber", this.birthCert)
      formData.append("address", this.address)
      formData.append("genderId", this.gender)
    
    this.http
      .put('http://localhost:5028/api/Students/' + this.studentId,formData)
      .subscribe((data) => {
        console.log(data);

        this.route.navigate(['student/list']);
      });
  }

}
