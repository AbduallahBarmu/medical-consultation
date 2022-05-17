@nearBindgen


//create Doctor account (doctor storage )
export class DoctorModule {
  name:string;
  mail:string;
  specialization:string; 
  
  
  constructor(name: string, mail: string, specialization: string) {
    this.name = name;
    this.mail = mail;
    this.specialization = specialization;
  }

}