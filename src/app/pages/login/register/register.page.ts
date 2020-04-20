import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService, Driver } from 'src/app/database.service';
import { delay } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    drivers: Driver[] = [];
    driver = {};
    isActiveToggleTextPassword: Boolean = true;
    checkToogle : Boolean = true;
    checkPassw: any;
    email: any;
    password: any;
    public registerForm: FormGroup;

    constructor(private router: Router, private database: DatabaseService, private alertController: AlertController, public formBuilder: FormBuilder) {
        this.database.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.database.getDrivers().subscribe(driver => {
                    this.drivers = driver;
                });
            }
        });
        this.registerForm = new FormGroup({
            email: new FormControl ('', Validators.compose([Validators.required,Validators.email])),
            password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
            checkPsw : new FormControl('', Validators.compose([Validators.minLength(6), Validators.required]))


        })
    }

    ngOnInit() {
    }

    async check(driver: Driver) {
        let res = await this.database.checkEmail(this.email);
        return res;
    }

    checkDoublePass() {
        if (this.password === this.checkPassw) {
            return true;
        } else {
            return false;
        }
    }

    async addDriver(driver: Driver) {
        if (this.registerForm.controls.checkPsw.valid && this.registerForm.controls.password.valid && this.registerForm.controls.email.valid){
            this.email = this.registerForm.value.email;
            this.password = this.registerForm.value.password;
            this.checkPassw = this.registerForm.value.checkPsw;
            let res = await this.check(driver);
            let equalPass = this.checkDoublePass();
            if (res == 0 && equalPass == true) {
                this.database.addDriver(this.driver['name'], this.driver['surname'], this.driver['cf_driver'], this.driver['phone'], this.email, this.password, this.driver['is_login']);
                this.router.navigateByUrl('/login');
            } else if (res != 0 && equalPass == true) {
                this.userAlreadyRegister();
    
            } else if (equalPass == false && res == 0) {
                this.incorrectPassw();
                this.driver['password'] = '';
                this.checkPassw = '';
    
    
            } else {
                this.userAlreadyRegister();
    
            }
        }
        else{
            this.compileAllForm();
            

        }
        
       
    }

    async userAlreadyRegister() {
        const alert = await this.alertController.create({
            header: 'ATTENZIONE!',

            message: 'Sei già registrato con questo indirizzo email! ',
            buttons: [{
                text: 'OK',
                cssClass: 'secondary'
            }]
        });

        await alert.present();
    }


    async incorrectPassw() {
        const alert = await this.alertController.create({
            header: 'ATTENZIONE!',

            message: 'Le password non combaciano! ',
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

    showHidecheck() {
        this.checkToogle= (this.checkToogle == true) ? false : true;
    }

    getType() {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    }

    getType1() {
        return this.checkToogle ? 'password' : 'text';
    }

    async compileAllForm() {
        const alert = await this.alertController.create({
            header: 'ATTENZIONE!',

            message: 'Compila i campi obbligatori! ',
            buttons: [{
                text: 'OK',
                cssClass: 'secondary'
            }]
        });

        await alert.present();
    }

}
