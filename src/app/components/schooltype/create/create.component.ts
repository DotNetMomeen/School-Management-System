import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { School } from '../../../Models/school';
import { DataService } from '../../../Services/data.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  schoolTypes: School[] = [];

  schoolForm: FormGroup = new FormGroup({
    schoolTypeId: new FormControl(undefined, Validators.required),
    schoolTypeName: new FormControl(undefined, Validators.required),
    schoolTypes: new FormArray([])
  });
  
  constructor(private schoolTypeService: DataService) {}

  ngOnInit() {
    this.schoolTypeService.getSchools().subscribe(data => {
      this.schoolTypes = data;
    });
  }

  addSchoolType(schoolType: School) {
    this.schoolTypeService.addSchool(schoolType).subscribe();
  }

}




