import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  nome: string= "";
  surname: string= "";
  cf: string= "";
  phone: string= "";
  email: string= "";


  constructor(private http: HttpClient){}

  ngOnInit() {
  }

  addDriver(){
    let postParams =  {
      name: this.nome,
      surname: this.nome,
      cf: this.cf,
      phone: this.phone,
      email: this.email
    };

    this.http.post('http://localhost:3000/insertDriver', postParams)
      .subscribe(response => {
        console.log('POST Response:', response);
      });
    }  
  }
