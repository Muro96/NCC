import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

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


  constructor(private http: HttpClient, private sqlite: SQLite){}


  ngOnInit() {}

  init(){
    this.sqlite = new SQLite();
    this.sqlite.create({
      name: "ncc_db.db",
      location: "default"
    }).then((db: SQLiteObject) =>{
      db.executeSql('create table if not exist agency (agency_id INTEGER PRIMARY KEY, name TEXT not null, vat TEXT not null, cf TEXT not null, address TEXT, city TEXT, cap TEXT, province TEXT, phone TEXT)')
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
    })
    }
  }
  
