import { Routes } from '@angular/router';
import { CreateSchoolComponent } from './components/Building/create-school/create-school.component';
import { ViewSchoolComponent } from './components/Building/view-school/view-school.component';
import { EditSchoolComponent } from './components/Building/edit-school/edit-school.component';
import { StudentListComponent } from './components/Student/student-list/student-list.component';
import { CreateStudentComponent } from './components/Student/create-student/create-student.component';
import { EditStudentComponent } from './components/Student/edit-student/edit-student.component';
import { ViewTeacherComponent } from './components/Teacher/view-teacher/view-teacher.component';
import { CreateTeacherComponent } from './components/Teacher/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './components/Teacher/edit-teacher/edit-teacher.component';
import { ViewGuardianComponent } from './components/Guardian/view-guardian/view-guardian.component';
import { CreateGuardianComponent } from './components/Guardian/create-guardian/create-guardian.component';
import { EditGuardianComponent } from './components/Guardian/edit-guardian/edit-guardian.component';

export const routes: Routes = [
  // {path:"",component:AppComponent},
  { path: 'school', component: ViewSchoolComponent },
  { path: 'school/edit/ : id', component: EditSchoolComponent },
  { path: 'school/create', component: CreateSchoolComponent },
  { path: 'student/list', component: StudentListComponent },
  { path: 'student/create', component: CreateStudentComponent },
  { path: 'student/edit', component: EditStudentComponent },
  { path: 'viewTeacher', component: ViewTeacherComponent },
  { path: 'createTeacher', component: CreateTeacherComponent },
  { path: 'masterdetails-edit/:id', component: EditTeacherComponent },
  { path: 'viewGuardian', component: ViewGuardianComponent },
  { path: 'createGuardian', component: CreateGuardianComponent },
  { path: 'edit-Guardian/:id', component: EditGuardianComponent },
];
