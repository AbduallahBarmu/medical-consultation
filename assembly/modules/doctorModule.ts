


//create Doctor account (doctor storage )
@nearBindgen
export class DoctorModule {
  name:string;
  mail:string;
  specialty:string; 
  doctorId:string
  
  
  constructor(name: string, mail: string, specialty: string, doctorId:string) {
    this.name = name;
    this.mail = mail;
    this.specialty = specialty;
    this.doctorId = doctorId ; 
  }

}