import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private emailcom:EmailComposer) {

  }

  sendEmail(nombre:string, body:string){
    let email ={
      to: 'pedrodelafuentefdez@gmail.com',
      subject: 'Sugerencia por '+nombre,
      body: body,
      isHtml: true
    }

    return this.emailcom.open(email)

  }
}
