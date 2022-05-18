import { Context, PersistentVector , PersistentMap } from "near-sdk-as";

// import modules 
import { DoctorModule} from "./modules/doctorModule";
import {ConsultationModule} from './modules/consultationModule'



@nearBindgen
export class DocCons{
  // method-1 create Doctor account (doctor storage )



  // storage info in blockchaing
  messageLists:PersistentVector<ConsultationModule> = new PersistentVector<ConsultationModule>('w')

  // method-2 create consultation message(Patient => doctor by doctor ID )
  create_consultation_message(message:string , receiver:string):ConsultationModule{
      let sender:string = Context.sender ; 
      let writing:ConsultationModule = new ConsultationModule(message, sender, receiver);
      this.messageLists.push(writing)  // anyone call this method , will take the object and save it in the list 
      
      return writing ; 
  }



  // method-3 list`s messages for the doctor  
  display_consultation_messages(): Array<ConsultationModule> {
      let messages = new Array<ConsultationModule>(this.messageLists.length);
      for(let i = 0 ; i < this.messageLists.length ; i++){
        messages[i]= this.messageLists[i];
       }  
       return messages ; 
    }





    keys: PersistentVector<string> = new PersistentVector<string>("keys");
    doctors: PersistentMap<string, DoctorModule> = new PersistentMap<string,DoctorModule>("doctor"); //key:orgCode, value: org object. Value could be of any type.

 // method add new Doctor account
  @mutateState()
    add_doctor(name:string , mail:string , specialty:string , doctorId:string):string{
      doctorId = doctorId.toUpperCase();
      let doctor = new DoctorModule(name , mail , specialty , doctorId);
     
      this.keys.push(doctorId)
      this.doctors.set(doctorId , doctor)
      return "Doctor Created= " + doctorId + " and Name= " + name + "and Specialty" + specialty ;
    }



     // method-4 list Doctors by department ID
    get_doctors():Map<string, DoctorModule>{
     
      //maps can't be returned directly. You need to copy the values to a temp normal map and return it 
      const returnDoctors:Map<string ,DoctorModule> = new Map<string , DoctorModule>();

      for(let i = 0 ; i < this.keys.length ; i++){
        returnDoctors.set(this.keys[i], this.doctors.getSome(this.keys[i])) ; 
      }
      return returnDoctors; 
    }



  // method-5 replay on message by ID (Patient receive message from doctor )
  
  // method-6 transfer Tokens from patient ⇒ doctor 



}
