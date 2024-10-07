import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-school',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-school.component.html',
  styleUrl: './view-school.component.css'
})
export class ViewSchoolComponent  implements OnInit{
  ngOnInit(): void {
    this.getschool();
  }

  school: any []=[];

  http= inject(HttpClient);

  getschool(){
    this.http.get('http://localhost:5028/api/Schools/GetSchools').subscribe((res:any) =>{
      this.school=res;
    })
  }

  onDelete(id:any){
    this.http.delete('http://localhost:5028/api/Schools/' + id).subscribe((res:any) =>{
      this.getschool();
    })
  }
}
