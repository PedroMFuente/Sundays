import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public emailForm:FormGroup;
  public showExample:boolean =false;
  constructor(private form:FormBuilder, private emailS:EmailService) {
    this.emailForm = this.form.group({
      nombre:[],
      body:['',Validators.required]
    })
   }

  ngOnInit() {
  }

  /**
   * Recibe del form el nombre y la sugerencia. Abre el mail por defecto del smartphone
   */
  sendSuggestion(){
    let nombre = this.emailForm.get("nombre").value
    let body = this.emailForm.get("body").value

    this.emailS.sendEmail(nombre, body).then(success=>console.log("success"), error=>console.log(error))
  }

  switchShowExamples(){
    this.showExample= !this.showExample;
  }
}
