import { app } from './app';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { ApperyioModule } from './scripts/apperyio/apperyio.module';

import { PipesModule } from './scripts/pipes.module';
import { DirectivesModule } from './scripts/directives.module';
import { ComponentsModule } from './scripts/components.module';
import { CustomComponentsModule } from './scripts/custom-components.module';
import { CustomModulesModule } from './scripts/custom-modules.module';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Device } from '@ionic-native/device/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { ExportedClass as getChatBotResponse_service } from './scripts/services/getChatBotResponse_service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
    declarations: [
        app
    ],
    imports: [
        BrowserModule,
        FormsModule,
        IonicModule.forRoot(),
        HttpClientModule,
        ApperyioModule,
        PipesModule,
        DirectivesModule,
        ComponentsModule,
        CustomComponentsModule,
        CustomModulesModule,
        IonicStorageModule.forRoot(),
        AppRoutingModule
    ],
    bootstrap: [
        app
    ],
    /*entryComponents: [
        //app
    ],*/
    providers: [
        StatusBar,
        SplashScreen,
        WebView,
        Device,
        Keyboard,
        getChatBotResponse_service,
        SpeechRecognition,
        TextToSpeech,
        Flashlight,
        LaunchNavigator,
        EmailComposer,
    ]
})
export class AppModule {}