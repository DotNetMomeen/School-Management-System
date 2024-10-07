import { CommonModule, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { File } from 'node:buffer';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
})
export class CreateStudentComponent {
  constructor(private http: HttpClient) {}
  // route = inject(Router);
  fName: string = '';
  lName: string = '';
  fatherName: string = '';
  motherName: string = '';
  dob: Date = new Date();
  gender: string = '';
  image: any = File;
  imagePath: any | ArrayBuffer | null;
  address: string = '';
  birthCert: string = '';

  // updateFile(event: Event){
  //   //@ts-ignore
  //   const file = event.target.files[0];
  //   console.log(file);
  //   this.imagePath=file;
  //    }

  updateFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.image = input.files[0];
      const reader = new FileReader();

      // Once the file is loaded, assign the result to `imagePreview`
      reader.onload = (e) => {
        this.imagePath = reader.result;
      };

      reader.readAsDataURL(this.image); // Convert file to base64 URL
    }
  }

  async createStudent() {
    console.log(this.fName);
    let formData: any = new FormData();
    formData.append('studentFname', this.fName);
    formData.append('studentLName', this.lName);
    formData.append('fatherName', this.fatherName);
    formData.append('motherName', this.motherName);
    formData.append('dateOfBirth', this.dob);
    formData.append('image', this.imagePath);
    formData.append('imagePath', this.imagePath);
    formData.append('birthCertificateNumber', this.birthCert);
    formData.append('address', this.address);
    formData.append('genderId', this.gender);

    this.http
      .post('http://localhost:5028/api/Students', formData)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
