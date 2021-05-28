import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApperyioHelperService } from '../scripts/apperyio/apperyio_helper';
import { ApperyioMappingHelperService } from '../scripts/apperyio/apperyio_mapping_helper';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx'

import { TypeMessage } from '../models/typeMessage';
import { Payload } from '../models/Payload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'Screen1.html',
    selector: 'page-screen1',
    styleUrls: ['Screen1.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class Screen1 {

    //#region 
    public messages: TypeMessage[] = [];
    permission: boolean = false;
    recording: boolean = false;

    private apiUrlWeather:string = environment.apiUrlWeather;
    private apikeyWeather:string = environment.apikeyWeather;
    //#endregion
    
    //#region Mapping
    public mappingData: any = {};
    /**
     * Funcion generado por Apperyio
     */
    public __getMapping(_currentItem, property, defaultValue, isVariable?, isSelected?) {
        return this.mappingHelper.getMapping(this.mappingData, _currentItem, property, defaultValue, isVariable, isSelected);
    }
    /**
     * Funcion generado por Apperyio
     */
    public __setMapping(data: any = {}, keyName: string, propName?: string): void {
        const changes = data.detail || {};
        if (propName) {
            this.mappingData = this.mappingHelper.updateData(this.mappingData, [keyName], changes[propName]);
        } else {
            this.mappingData = this.mappingHelper.updateData(this.mappingData, [keyName], changes.value);
        }
    }
    //#endregion

    constructor( private launchNav:LaunchNavigator, private router:Router, private http:HttpClient, 
        private flashLight:Flashlight, private tts:TextToSpeech, private speech: SpeechRecognition, public Apperyio: ApperyioHelperService, 
        private mappingHelper: ApperyioMappingHelperService, private changeDet: ChangeDetectorRef) {
        
        //#region Al iniciar la aplicación o se vuelve de settings
        this.speech.isRecognitionAvailable().then((available:boolean)=>{
            console.log("available "+ available)
        })
        this.speech.hasPermission().then((hasp:boolean)=>{
            console.log("haspermission "+hasp)
            this.permission=hasp
        })
        if(!this.permission){
            this.getPermission()
        }

        this.messages=[]
        //#endregion
    }

    //#region Ir al Settings
    /**
     * Nos lleva a la ventana de settings
     */
    goSettings(){
        this.router.navigate(["settings"])
    }
    //#endregion

    //#region Permisos
    /**
     * Comprueba los permisos de SpeechRecognition
     */
    getPermission() {
        this.speech.requestPermission().then(
            () => this.permissionGranted(), //Tiene permiso
            () => this.permissionDenied()   //No tiene permiso
        )
    }

    /**
   * Funcion que se llama si la aplicación tiene permiso para acceder al microfono
   */
    permissionGranted() {
        this.permission = true;
        //this.ButtonMic();
    }

    /**
     * Funcion que se llama si la aplicación NO tiene permiso para acceder al microfono
     */
    permissionDenied() {
        this.permission = false;
        alert("La aplicación necesita el microfono para funcionar.")
    }

    /**
     * Esta funcion es llamada al pulsar el boton para hablar
     * Primero comprueba que speechRecognition tiene permiso
     * Inicia SpeechRecognition, la palabra o frase que detecte la pasará a la funcion botmessage
     */
    //#endregion

    //#region reconocimiento de voz y llamada al asistente virtual
    ButtonMic() {

        if (!this.permission) {
            this.getPermission();
            return;
        }

        let options = {
            language: 'es-ES'
        }
        this.recording = true;


        this.speech.startListening(options).subscribe((matches) => {
            var mymsg:TypeMessage={
                text: matches[0],
                type: 'user'
            }
            this.messages.push(mymsg);
            this.changeDet.detectChanges()
            this.botmessage(matches[0])
            
            this.recording = false;
        });
    }

    /**
     * gracias a apperyio, llamará al script getChatBotResponse, que conectará con la api de dialogflow
     * @param mymsg => Mensaje recibido de SpeechRecognition
     */
    botmessage(mymsg:string){
        let answer:TypeMessage={
            text:'',type:'bot'
        }
        let payload:Payload={
            action:''
        };
        
        this.Apperyio.getService("getChatBotResponse_service").then(
            async (service) => {
                if (!service) {
                    console.log("Error. Service was not found.");
                    return;
                }
                let data = {};
                let params = {};
                let headers = {};

                /* Mapping */
                data =  this.mappingHelper.updateData(data, ["message"], this.mappingHelper.getSubdata(mymsg, []));
                service.execute({
                    data: data,
                    params: params,
                    headers: headers
                }).subscribe(
                    /* onsuccess */
                    async (res: any) => {
                        let mappingData: any = {};
                        /* Mapping */
                        this.messages = this.mappingHelper.updateData(this.messages, [], ((value) => {
                            let oldMessages = this.messages;

                            answer.text = value[0].text.text[0];

                            payload.action = value[1].payload.action;
                            if(value[1].payload.othervalue!=null){
                                payload.othervalue = value[1].payload.othervalue
                            }

                            return oldMessages;
                        })(this.mappingHelper.getSubdata(res, ["queryResult", "fulfillmentMessages"])));
                        this.mappingData = { ...this.mappingData,
                            ...mappingData
                        };
                        console.log(this.mappingData)

                        //console.log(payload)
                        this.doAction(payload, answer);
                        this.changeDet.detectChanges()
                        
                    },
                    (err: any) => {
                        console.log(err);
                    }
                )
            }
        );
    }
    //#endregion

    //#region Llamada a funciones segun respuesta del Asistente virtual
    /**
     * Al tener una respuesta de la api DialogFlow, nos devuelve un mensaje y "payload"(carga util)
     * @param payload => valor de la accion a la que llama (input.??) / puede contener un othervalue dependiendo de la acción
     * @param answer => Cadena de texto, respuesta del mensaje
     */
    doAction(payload:Payload, answer:TypeMessage){

        var options:TTSOptions={
            text:answer.text,
            locale:'es-Es'
        }

        this.changeDet.detectChanges()
        switch (payload.action) {
            case 'input.welcome':
                this.tts.speak(options).then(()=> console.log('Success')).catch((reason:any)=>console.log(reason))
                this.messages.push(answer);
                break;
            
            case 'input.presentacion':
                this.tts.speak(options).then(()=> console.log('Success')).catch((reason:any)=>console.log(reason))
                this.messages.push(answer);
                break;

            case 'input.flashlighton':
                this.flashLight.available().then(()=>this.flashLight.switchOn(), (err)=>console.log(err))
                
                this.tts.speak(options).then(()=> console.log('Success')).catch((reason:any)=>console.log(reason))
                this.messages.push(answer);
                break;

            case 'input.flashlightoff':
                this.flashLight.available().then(()=>this.flashLight.switchOff(), (err)=>console.log(err))

                this.tts.speak(options).then(()=> console.log('Success')).catch((reason:any)=>console.log(reason))
                this.messages.push(answer);
                break;
            
            case 'input.weather':
                this.http.get(this.apiUrlWeather+`${payload.othervalue}&appid=${this.apikeyWeather}`).subscribe((aux:any)=>{
                    answer.text+=' '+aux.weather[0].main
                    options.text= answer.text;
                }).add(()=>{
                    this.tts.speak(options).then(()=> console.log('Success')).catch((reason:any)=>console.log(reason))
                    this.messages.push(answer);
                    this.changeDet.detectChanges()
                })
                break;

            case 'input.navigator':
                this.launchNav.navigate(payload.othervalue).then(
                    success=>console.log("launched"), 
                    error=>console.log(error))
                break;

            case 'input.searchweb':
                this.messages.push(answer);
                this.changeDet.detectChanges()
                window.open(`https://www.google.com/search?q=${payload.othervalue}`)
                break;
        
            default:
                this.tts.speak(options).then(()=> console.log('Success')).catch((reason:any)=>console.log(reason))
                this.messages.push(answer);
                break;
        }
    }
    //#endregion

}