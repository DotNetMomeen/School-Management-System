export class Student {
  constructor(
    public studentId?: number,
    public studentFName?: string,
    public studentLName?: string,
    public fatherName?: string,
    public motherName?: string,
    public dateOfBirth?: Date,
    public phone?: string,
    public image?: string,
    public birthCertificateNumber?: string,
    public address?: string,
    public genderId?: string
  ) {}
}
