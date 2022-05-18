import { Context, PersistentVector } from "near-sdk-as";

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










  
  // method-4 list Doctors by department ID

  // method-5 replay on message by ID (Patient receive message from doctor )
  
  // method-6 transfer Tokens from patient ⇒ doctor 



}
