import { Context, PersistentVector , PersistentMap } from "near-sdk-as";

// import modules 
import { DoctorModule} from "./modules/doctorModule";
import {ConsultationModule} from './modules/consultationModule'



@nearBindgen
export class DocCons{



  // storage info in blockchaing
  messageLists:PersistentVector<ConsultationModule> = new PersistentVector<ConsultationModule>('w')

  //create consultation message(Patient => doctor by doctor ID )
  createConsultation(message:string , doctorId:string ):ConsultationModule{
      let sender:string = Context.sender ; 
      let writing:ConsultationModule = new ConsultationModule(message , sender , doctorId);
      this.messageLists.push(writing)  // anyone call this method , will take the object and save it in the list 
      
      return writing ; 
  }



  //list`s consultations for the doctor  
  displayConsultation(): Array<ConsultationModule> {
      let messages = new Array<ConsultationModule>(this.messageLists.length);
      for(let i = 0 ; i < this.messageLists.length ; i++){
        messages[i]= this.messageLists[i];
       }  
       return messages ; 
    }


    // doctor methods 
    keys: PersistentVector<string> = new PersistentVector<string>("keys");
    doctors: PersistentMap<string, DoctorModule> = new PersistentMap<string,DoctorModule>("doctor"); //key:orgCode, value: org object. Value could be of any type.
    
    //add new Doctor account
    @mutateState()
    addDoctor(name:string , mail:string , specialty:string , doctorId:string):string{
        doctorId = doctorId.toUpperCase();
        let doctor = new DoctorModule(name , mail , specialty , doctorId);
        this.keys.push(doctorId)
        this.doctors.set(doctorId , doctor)
        return "Doctor Created= " + doctorId + " and Name= " + name + "and Specialty" + specialty ;
    }



    //list Doctors by specialty
    getDoctors(specialty:string):Map<string, DoctorModule>{
      //maps can't be returned directly. we need to copy the values to a temp normal map and return it 
      const returnDoctors:Map<string ,DoctorModule> = new Map<string , DoctorModule>();

      for(let i = 0 ; i < this.keys.length ; i++){
        returnDoctors.set(this.keys[i], this.doctors.getSome(this.keys[i])) ; 
      }
      return returnDoctors; 
    }





  
    

  //replay on message by ID (Patient receive message from doctor )
  consultationIdReply(message:string , patientId:string):ConsultationModule{
    let reply:string = Context.sender ; 
    let replyMessage:ConsultationModule = new ConsultationModule(message , reply , patientId)
    this.messageLists.push(replyMessage)

    return replyMessage
  }


  // method-6 transfer Tokens from patient ⇒ doctor 



}
