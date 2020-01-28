import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Agency {
  agency_id: number;
  name: string;
  vat: string;
  cf: string;
  address: string;
  city: string;
  cap: string;
  province: string;
  phone: string;
}

export interface Driver {
  driver_id: number;
  name: string;
  surname: string;
  cf_driver: string;
  phone: string;
  email: string;
  password: string;
  is_login: number;
  
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  database : SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  
  agency = new BehaviorSubject([]);
  driver = new BehaviorSubject([]);

  constructor(private platform: Platform, private http: HttpClientModule, private sqlite : SQLite) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() =>{
      this.sqlite.create({
        name: 'ncc_db.db',
        //key: 'QWEB_NCC_2020',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        this.database = db;
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
                        'name TEXT,' +
                        'surname TEXT,' +
                        'cf_driver TEXT,' +
                        'phone TEXT,' +
                        'email TEXT,' +
                        'password TEXT,' +
                        'is_login INTEGER,' +
                        'fk_agency INTEGER,' +
                        'FOREIGN KEY(fk_agency) REFERENCES agency(agency_id) ON DELETE CASCADE);',[]);

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

      this.getAllAgency();
      this.databaseReady.next(true);
      })
      });
    }
    
    getDatabaseState(){
      return this.databaseReady.asObservable();
    }

    getAgency(): Observable<Agency[]> {
      console.log(this.agency.asObservable());
      return this.agency.asObservable();
    }
    getDrivers(): Observable<Driver[]> {
      return this.driver.asObservable();
    }

   


    async addAgency(name: string,vat: string,cf: string,address: string,city: string,cap: string,province: string,phone: string){
      let data = [name,vat,cf,address,city,cap,province,phone];
      const data_1 = await this.database.executeSql('INSERT INTO agency (name,vat,cf,address,city,cap,province,phone) VALUES (?,?,?,?,?,?,?,?)', data);
      this.getAllAgency();
    }
    

     async getAllAgency(){
      return this.database.executeSql('SELECT * FROM agency;', []).then(data => {
        const agency: Agency[] = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
              agency.push({
                agency_id: data.rows.item(i).agency_id,
                name: data.rows.item(i).name,
                vat: data.rows.item(i).vat,
                cf: data.rows.item(i).cf,
                address: data.rows.item(i).address,
                city: data.rows.item(i).city,
                cap: data.rows.item(i).cap,
                province: data.rows.item(i).province,
                phone: data.rows.item(i).phone
                });
              }
            }
        this.agency.next(agency);
      });
    }

    async deleteAgency(agency_id:number) {
      const _ = await this.database.executeSql('DELETE FROM agency WHERE agency_id = ?', [agency_id]);
      this.getAllAgency();
      
    }

    async updateAgency(agency: Agency) {
      let data = [agency.name,agency.vat,agency.cf,agency.address,agency.city,agency.cap,agency.province,agency.phone];
      const _ = await this.database.executeSql('UPDATE agency SET name = ?, vat = ?, cf = ?, address = ?, city = ?, cap = ?, province = ?, phone = ? WHERE agency_id = ${agency.agency_id} ',data);
      this.getAllAgency();
      
    }

    async addDriver(name:string,surname:string,cf_driver:string,phone:string,email:string,password:string,is_login:number){
      let data = [name,surname,cf_driver,phone,email,password,is_login];
      const a = await this.database.executeSql('INSERT INTO driver (name,surname,cf_driver,phone,email,password,is_login) VALUES (?,?,?,?,?,?,?)', data);
      } 
      
      async checkEmail(email:string){
        let result: any;
        let query = "SELECT * FROM driver WHERE email ="+"'" + email + "'" +";"
        console.log("queryyy"+query);
        return this.database.executeSql(query, []).then(data =>{
          console.log("lenght" + data.rows.length);
          result = data.rows.length;
          console.log("result"+result);
          return result;
        });
        
      }
   
}
