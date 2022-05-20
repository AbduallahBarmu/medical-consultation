
//create Messages module (consultation storage )

@nearBindgen
export class ConsultationModule {

  message: string;
  doctorId: string;
  patientId: string
  reply: string; 



  constructor(message: string, doctorId: string, patientId: string ,  reply:string) {
    this.message = message;
    this.doctorId = doctorId;
    this.patientId = patientId ; 
    this.reply = reply
  }
  
}