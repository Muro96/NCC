import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.page.html',
  styleUrls: ['./agency.page.scss'],
})


export class AgencyPage implements OnInit {
  nome: string= "";
  vat: string= "";
  cf: string= "";
  address: string= "";
  city: string= "";
  cap: string= "";
  province: string= "";
  phone: string= "";


  constructor(private http: HttpClient){}

  ngOnInit() {
  }

  addAgency(){
    let postParams =  {
      name: this.nome,
      city: this.city,
      province: this.province,
      cap: this.cap,
      vat: this.vat,
      phone_number: this.phone,
      cf: this.cf,
      address: this.address
    };

    this.http.post('http://localhost:3000/insertAgency', postParams)
      .subscribe(response => {
        console.log('POST Response:', response);
      });
    }  
  }
