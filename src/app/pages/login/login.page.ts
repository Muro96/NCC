import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private database : DatabaseService) { 
    this.database.getDatabaseState().subscribe(ready => {
      if(ready){
        console.log("database pronto");
      }
    })
  }

  ngOnInit() {
  }

  signIn(){
    this.router.navigateByUrl('/home');
  
  }
  signUp(){
    this.router.navigateByUrl('login/register');

  }

}
