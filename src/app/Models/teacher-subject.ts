import { Subject } from './subject';

export class TeacherSubject {
  constructor(
    public teacherId?: number,
    public teacherName?: string,
    public dateOfBirth?: Date,
    public phone?: string,
    public teacherImage?: string,
    public imagePath?: File,
    public qualification?: string,
    public joinDate?: Date,
    public genderId?: string,
    public subjectsList?: Subject[]
  ) {}
}
