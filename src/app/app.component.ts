import {Component, ViewChild} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Impostazioni',
            url: '/settings',
            icon: 'md-settings',
            subPages: [
            { title: 'Azienda', url: '' },
            { title: 'Conducente', url: '/settings/drivers', icon: '' },
            { title: 'Mezzi', url: '/settings/vehicles', icon:'md-car' },
            { title: 'Clienti', url: '/settings/clients' },
            { title: 'Partenze', url: '/settings/departures' },
            { title: 'Destinazioni', url: '/settings/destinations' }],
        },
    
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            this.statusBar.styleBlackOpaque();
        });
    }
}
