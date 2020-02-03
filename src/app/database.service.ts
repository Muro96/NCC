import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

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
export interface Vehicle {
  vehicle_id: number;
  car_model: string;
  license_plate: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  database : SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  
  agency = new BehaviorSubject([]);
  driver = new BehaviorSubject([]);
  vehicle = new BehaviorSubject([]);

  constructor(private platform: Platform, private http: HttpClientModule, private sqlite : SQLite) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() =>{
      this.sqlite.create({
        name: 'ncc_db.db',
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
                        'billing_notes TEXT,' +
                        'fk_client INTEGER,' +
                        'FOREIGN KEY(fk_client) REFERENCES driver(driver_id));',[]);

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
      this.getAllVehicles();
      this.databaseReady.next(true);
      })
      });
    }
    
    getDatabaseState(){
      return this.databaseReady.asObservable();
    }

    getAgency(): Observable<Agency[]> {
      return this.agency.asObservable();
    }
    getDrivers(): Observable<Driver[]> {
      return this.driver.asObservable();
    }
    getVehicles(): Observable<Vehicle[]>{
      return this.vehicle.asObservable();
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
      let data = [agency.name,agency.vat,agency.cf,agency.address,agency.city,agency.cap,agency.province,agency.phone,agency.agency_id];
      console.log("agency_id"+agency.agency_id);
      const _ = await this.database.executeSql('UPDATE agency SET name = ?, vat = ?, cf = ?, address = ?, city = ?, cap = ?, province = ?, phone = ? WHERE agency_id = ?',data);
      this.getAllAgency();
      
    }

    async addDriver(name:string,surname:string,cf_driver:string,phone:string,email:string,password:string,is_login:number){
      let data = [name,surname,cf_driver,phone,email,Md5.hashStr(password),is_login=0];
      const a = await this.database.executeSql('INSERT INTO driver (name,surname,cf_driver,phone,email,password,is_login) VALUES (?,?,?,?,?,?,?)', data);
      } 
      
    async checkEmail(email:string){
      let result: any;
      let query = "SELECT * FROM driver WHERE email ="+"'" + email + "'" +";"
      return this.database.executeSql(query, []).then(data =>{
        result = data.rows.length;
        return result;
        });
        
      }

    async checkEmailPassw(email:string,password:any){
      let result: any;
      let query = "SELECT * FROM driver WHERE email ="+"'" + email + "'" + "AND password="+"'" + password + "'" + ";"
      return this.database.executeSql(query,[]).then(data =>{
        result = data.rows.length;
        return result;
      })

    }

    async getDriverEmailPass(email:string,password:any){
      let query = "SELECT * FROM driver WHERE email ="+"'" + email + "'" + "AND password="+"'" + password + "'" + ";"
      return this.database.executeSql(query,[]).then(data =>{
        return {
          driver_id: data.rows.item(0).driver_id,
          name: data.rows.item(0).name, 
          surname: data.rows.item(0).surname, 
          cf_driver: data.rows.item(0).cf_driver,
          phone: data.rows.item(0).phone,
          email: data.rows.item(0).email,
          password: data.rows.item(0).password,
          is_login: data.rows.item(0).is_login
        }
      });
      

    }

    async updateIsLogin(id:number) {
      let data = [1,id];
      return this.database.executeSql('UPDATE driver SET is_login = ? WHERE driver_id = ?',data);
      
    }

    async updateLogut(id:number) {
      let data = [0,id];
      return this.database.executeSql('UPDATE driver SET is_login = ? WHERE driver_id = ?',data);
      
    }

    async getDriverLogin(){
      let a = [1]; 
      console.log("IS ONE"+a);
      return this.database.executeSql('SELECT * FROM driver WHERE is_login = ?',a).then(data =>{
        return {
          driver_id: data.rows.item(0).driver_id,
          name: data.rows.item(0).name, 
          surname: data.rows.item(0).surname, 
          cf_driver: data.rows.item(0).cf_driver,
          phone: data.rows.item(0).phone,
          email: data.rows.item(0).email,
          password: data.rows.item(0).password,
          is_login: data.rows.item(0).is_login
          }
      });
    
    }

    async updateDriver(driver: Driver) {
      let data = [driver.name,driver.surname,driver.cf_driver,driver.phone,driver.email,driver.driver_id];
      console.log("driver_id"+driver.driver_id);
      const _ = await this.database.executeSql('UPDATE driver SET name = ?, surname = ?, cf_driver = ?, phone = ?, email = ? WHERE driver_id = ?',data);
      this.getDriverLogin();
      
    }

    async addVehicle(car_model: string,license_plate:string) {
      let driverIdFk = await (await this.getDriverLogin()).driver_id;
      console.log("driver id q"+driverIdFk);
      let data = [car_model,license_plate,driverIdFk];
      const a = await this.database.executeSql('INSERT INTO vehicle (car_model,license_plate,fk_driver) VALUES (?,?,?)', data);
      this.getAllVehicles();
    }

    async getAllVehicles(){
      let a = [1];
      return this.database.executeSql('SELECT * FROM vehicle INNER JOIN driver ON driver.driver_id = vehicle.fk_driver WHERE driver.is_login = ?',a).then(data =>{
        const vehicle: Vehicle[] = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
              vehicle.push({
                vehicle_id: data.rows.item(i).vehicle_id,
                car_model: data.rows.item(i).car_model,
                license_plate: data.rows.item(i).license_plate

              });
                  
          }
        }
        this.vehicle.next(vehicle); 
      });
    }

  }
   
