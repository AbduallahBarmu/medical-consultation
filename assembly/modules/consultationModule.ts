@nearBindgen


//create Messages module (consultation storage )
export class ConsultationModule {

  message: string;
  sender: string;
  receiver: string;

  constructor(message: string, sender: string, receiver: string) {
    this.message = message;
    this.sender = sender;
    this.receiver = receiver;
  }
}