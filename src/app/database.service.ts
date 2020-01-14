import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  database : SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;


  constructor(private platform: Platform, private http: HttpClientModule, private sqlite : SQLite) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() =>{
      this.sqlite.create({
        name: "ncc_db.db",
        location: "default"
      }).then((db: SQLiteObject) =>{
        //AGENZIE 
        db.executeSql('CREATE TABLE IF NOT EXISTS agency'+
                        '(agency_id INTEGER PRIMARY KEY,'+ 
                        'name TEXT not null,' + 
                        'vat TEXT not null,' + 
                        'cf TEXT not null,'+
                        'address TEXT,' +
                        'city TEXT,' + 
                        'cap TEXT,' +
                        'province TEXT,' +
                        'phone TEXT);',[]);
        //CONDUCENTI
        db.executeSql('CREATE TABLE IF NOT EXISTS driver' +
                        '(driver_id INTEGER PRIMARY KEY,' +
                        'name TEXT not null,' +
                        'surname TEXT not null,' +
                        'cf_driver TEXT not null,' +
                        'phone TEXT,' +
                        'email TEXT,' +
                        'fk_agency INTEGER,' +
                        'FOREIGN KEY(fk_agency) REFERENCES agency(agency_id));',[]);

        //VEICOLI  
        db.executeSql('CREATE TABLE IF NOT EXISTS vehicle' +
                        '(vehicle_id INTEGER PRIMARY KEY,' +
                        'car_model TEXT,' +
                        'license_plate TEXT not null,' +
                        'fk_driver INTEGER,' +
                        'FOREIGN KEY(fk_driver) REFERENCES driver(driver_id));',[]);

        // CLIENTI (COLUI CHE PAGA CORSA)
        db.executeSql('CREATE TABLE IF NOT EXISTS client' +
                        '(client_id INTEGER PRIMARY KEY,' + 
                        'name TEXT not null,' +
                        'city TEXT not null,' +
                        'country TEXT not null,' +
                        'province TEXT not null,' +
                        'is_private INTEGER,' +
                        'is_agency INTEGER,' + 
                        'cf TEXT,' + 
                        'vat TEXT,' +
                        'billing_notes TEXT);',[]);

        // PARTENZE
        db.executeSql('CREATE TABLE IF NOT EXISTS departure' +
                        '(id_departure INTEGER PRIMARY KEY,' +
                        'name TEXT,' +
                        'lat REAL,' +
                        'long REAL,' +
                        'city TEXT,' +
                        'province TEXT,' +
                        'country TEXT,' +
                        'address TEXT)',[]);

        //ARRIVI
        db.executeSql('CREATE TABLE IF NOT EXISTS arrival' +
                        '(id_arrival INTEGER PRIMARY KEY,' +
                        'name TEXT,' +
                        'lat REAL,' +
                        'long REAL,' +
                        'city TEXT,' +
                        'province TEXT,' +
                        'country TEXT,' +
                        'address TEXT)',[]);
    

      })
      });
    }
    
    getDatabaseState(){
      return this.databaseReady.asObservable();
    }


    addAgency(name: string,vat: string,cf: string,address: string,city: string,cap: string,province: string,phone: string){
      this.platform.ready().then(() =>{
        this.sqlite.create({
          name: "ncc_db.db",
          location: "default"
        }).then((db: SQLiteObject) =>{
          let data = [name,vat,cf,address,city,cap,province,phone];
          db.executeSql('INSERT INTO agency (name,vat,cf,address,city,cap,province,phone) VALUES (?,?,?,?,?,?,?,?)', data);
          

        });
      });
    }


}
