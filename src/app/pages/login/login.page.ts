import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseService, Driver} from 'src/app/database.service';
import {Md5} from 'ts-md5';
import {AlertController, NavController} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    driver = {};
    drivers: Driver[] = [];
    isActiveToggleTextPassword: Boolean = true;
    public loginForm: FormGroup;
    email:any;
    password:any

    constructor(private router: Router,public formBuilder: FormBuilder, private database: DatabaseService, private alertController: AlertController, public navcontroller: NavController) {
        this.database.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.database.getDrivers().subscribe(driver => {
                    this.drivers = driver;
                });
            }
        });
        this.loginForm = formBuilder.group({
            email: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])),
            password: new FormControl('',Validators.compose([Validators.minLength(6),Validators.required]))

        })

    }

    ngOnInit() {
    }

    async checkEmailPass() {
        this.email = this.loginForm.value.email
        this.password = this.loginForm.value.password
        let res = await this.database.checkEmailPassw(this.email, Md5.hashStr(this.password));
        return res;
    }

    async signIn() {
        let res = await this.checkEmailPass();
        if (res == 1) {
            let res1 = await this.database.getDriverEmailPass(this.email, Md5.hashStr(this.password));
            this.database.updateIsLogin(res1.driver_id).then(_ => {
                this.driver = {};

                this.navcontroller.navigateRoot('/home');
            });
        } else {
            this.invalidEmailPassword();
            this.driver = {};

        }

    }

    signUp() {
        this.router.navigateByUrl('login/register');

    }

    async invalidEmailPassword() {
        const alert = await this.alertController.create({
            header: 'ATTENZIONE!',

            message: 'Email o Password errati!',
            buttons: [{
                text: 'OK',
                cssClass: 'secondary'
            }]
        });

        await alert.present();
    }

    showHide() {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    }

    getType() {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    }

}
