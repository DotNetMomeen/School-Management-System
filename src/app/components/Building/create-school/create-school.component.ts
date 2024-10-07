import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { School } from '../../../Models/school';
import { Building } from '../../../Models/building';

@Component({
  selector: 'app-create-school',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './create-school.component.html',
  styleUrl: './create-school.component.css'
})
export class CreateSchoolComponent {
  http = inject(HttpClient);
  route= inject( Router);

  school: School ={
    schoolName:"",
    schoolLocation:"",
    email:"",
    establishedYear:"",
    buildings:[]
  }
  Buildings: Building ={
    buildingName:""
  }
  tempSchool : any[] =[];

  addSchool(){
    this.tempSchool=[...this.tempSchool, this.Buildings];
    this.Buildings ={
      buildingName:""
    };
  }
  AddSchoolBuilding(){
    this.school.buildings=[...this.school.buildings, ...this.tempSchool];
    this.http.post('http://localhost:5028/api/Schools', this.school).subscribe((res:any) => {
      this.route.navigateByUrl('/');
    });
  }
  edit(p : any){
    this.Buildings={...p};
    this.del(p);
  }
  
  del(p : any){
    this.tempSchool = this.tempSchool.filter((q) => q !==p)
  }
}


