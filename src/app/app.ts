import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    templateUrl: 'app.html',
    selector: 'app-root',
    styleUrls: ['app.scss']
})
export class app {
    public currentItem: any = null;
    public mappingData: any = {};
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }
}