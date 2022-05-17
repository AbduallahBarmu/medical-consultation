import { Context, PersistentVector } from "near-sdk-as";

// import modules 
import { DoctorModule} from "./modules/doctorModule";
import {ConsultationModule} from './modules/consultationModule'



@nearBindgen
export class DocCons{

  // storage info in blockchaing
  messageLists:PersistentVector<ConsultationModule> = new PersistentVector<ConsultationModule>('w')
 
  // method create Doctor account (doctor storage )
  


  // method create consultation message(Patient => doctor by doctor ID )
  consMessage(message:string , receiver:string):ConsultationModule{
      let sender:string = Context.sender ; 
      let writing:ConsultationModule = new ConsultationModule(message, sender, receiver);
      this.messageLists.push(writing)  // anyone call this method , will take the object and save it in the list 
      
      return writing ; 
  }




  // method list messages for the doctor  
  showMessages(): Array<ConsultationModule> {
      let mess= new Array<ConsultationModule>(this.messageLists.length);
      for(let i = 0 ; i < this.messageLists.length ; i++){
        mess[i]= this.messageLists[i];
       }
       
       return mess ; 
    }




  
  // method list Doctors by department ID


  // method replay on message by ID (Patient receive message from doctor )
  
  // method transfer Tokens from patient ⇒ doctor 



}
