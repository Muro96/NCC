import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';



export interface Agency {
    agency_id: number;
    name_agency: string;
    vat_agency: string
    address_agency: string;
    city_agency: string;
    cap_agency: string;
    province_agency: string;
    owner_agency: string;
    phone_agency: string;
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
    car_brand: string;
    car_model: string;
    license_plate: string;
}

export interface Client {
    client_id: number;
    name_client: string;
    surname_client: string;
    city: string;
    province: string;
    is_private: number;
    is_agency: number;
    cf: string;
    vat: string;
    billing_notes: string;
}

export interface Arrival {
    arrival_id: number;
    name_arr: string;
    lat_arr: string;
    long_arr: string;
    //city_arr: string;
    //province_arr: string;
    address_arr: string;
}

export interface Departure {
    departure_id: number;
    name_dep: string;
    lat_dep: string;
    long_dep: string;
    //city_dep: string;
    //province_dep: string;
    address_dep: string;
}

export interface Travel {
    travel_id: number;
    is_paid: number;
    n_pass: number;
    km_tot: number;
    date: string;
    hour: string;
    fk_departure: number,
    fk_arrival: number,
    fk_client: number
    name_client: string;
    surname_client: string;
    billing_notes_client: string;
    name_arrival: string;
    lat_arr: string;
    long_arr: string;
    //city_arrival: string;
    //province_arrival: string;
    address_arrival: string;
    name_departure: string;
    lat_dep: string;
    long_dep: string;
    //city_departure: string;
    //province_departure: string;
    address_departure: string;
    notes_travel: string;
    fk_vehicle: number;
    car_brand: string;
    car_model: string;
    licence_plate: string;
    name_driver: string;
    surname_driver: string;


}
export interface Register {
    register_id: number;
    print_reg: number;
    date: string;
    km_start: number;
    km_end: number;
    fk_vehicle: number;

}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
  

    database: SQLiteObject;
    mydate: string = new Date().toLocaleDateString('it-IT');
    private databaseReady: BehaviorSubject<boolean>;

    driver = new BehaviorSubject([]);
    vehicle = new BehaviorSubject([]);
    register = new BehaviorSubject([]);


    constructor(private platform: Platform, private http: HttpClientModule, private sqlite: SQLite) {
        this.databaseReady = new BehaviorSubject(false);
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'ncc_db.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.database = db;

                db.executeSql('CREATE TABLE IF NOT EXISTS agency' +
                    '(agency_id INTEGER PRIMARY KEY,' +
                    'name_agency TEXT,' +
                    'vat_agency TEXT,' +
                    'address_agency TEXT,' +
                    'city_agency TEXT,' +
                    'cap_agency TEXT,' +
                    'province_agency TEXT,' +
                    'owner_agency TEXT,' +
                    'phone_agency TEXT);', []);

                //CONDUCENTI
                db.executeSql('CREATE TABLE IF NOT EXISTS driver' +
                    '(driver_id INTEGER PRIMARY KEY,' +
                    'name TEXT,' +
                    'surname TEXT,' +
                    'cf_driver TEXT,' +
                    'phone TEXT,' +
                    'email TEXT,' +
                    'password TEXT,' +
                    'is_login INTEGER DEFAULT "0" NOT NULL)', []);

                //VEICOLI
                db.executeSql('CREATE TABLE vehicle' +
                    '(vehicle_id INTEGER PRIMARY KEY,' +
                    'car_brand TEXT not null,' +
                    'car_model TEXT not null,' +
                    'license_plate TEXT not null,' +
                    'fk_driver INTEGER,' +
                    'FOREIGN KEY(fk_driver) REFERENCES driver(driver_id));', []);

                // CLIENTI (COLUI CHE PAGA CORSA)
                db.executeSql('CREATE TABLE client' +
                    '(client_id INTEGER PRIMARY KEY,' +
                    'name_client TEXT,' +
                    'surname_client TEXT,' +
                    'city TEXT,' +
                    'province TEXT,' +
                    'is_private INTEGER,' +
                    'is_agency INTEGER,' +
                    'cf TEXT,' +
                    'vat TEXT,' +
                    'billing_notes TEXT,' +
                    'fk_driver INTEGER,' +
                    'FOREIGN KEY(fk_driver) REFERENCES driver(driver_id));', []);

                // PARTENZE
                db.executeSql('CREATE TABLE departure' +
                    '(departure_id INTEGER PRIMARY KEY,' +
                    'name_dep TEXT,' +
                    'lat_dep REAL,' +
                    'long_dep REAL,' +
                    'address_dep TEXT,' +
                    'fk_driver INTEGER,' +
                    'FOREIGN KEY(fk_driver) REFERENCES driver(driver_id));', []);

                //ARRIVI
                db.executeSql('CREATE TABLE arrival' +
                    '(arrival_id INTEGER PRIMARY KEY,' +
                    'name_arr TEXT,' +
                    'lat_arr REAL,' +
                    'long_arr REAL,' +
                    'address_arr TEXT,' +
                    'fk_driver INTEGER,' +
                    'FOREIGN KEY(fk_driver) REFERENCES driver(driver_id));', []);

                //TRAVEL
                db.executeSql('CREATE TABLE travel' +
                    '(travel_id INTEGER PRIMARY KEY,' +
                    'is_paid INTEGER,' +
                    'n_passenger INTEGER,' +
                    'km_tot INTEGER,' +
                    'date TEXT,' +
                    'hour TEXT,' +
                    'notes_travel TEXT,' +
                    'fk_departure INTEGER,' +
                    'fk_arrival INTEGER,' +
                    'fk_client INTEGER,' +
                    'fk_driver INTEGER,' +
                    'fk_vehicle INTEGER,' +
                    'FOREIGN KEY(fk_vehicle) REFERENCES vehicle(vehicle_id),' +
                    'FOREIGN KEY(fk_driver) REFERENCES driver(driver_id),' +
                    'FOREIGN KEY(fk_client) REFERENCES client(client_id),' +
                    'FOREIGN KEY(fk_arrival) REFERENCES arrival(arrival_id),' +
                    'FOREIGN KEY(fk_departure) REFERENCES departure(departure_id));', []);


                db.executeSql('CREATE TABLE register' +
                    '(register_id INTEGER PRIMARY KEY,' +
                    'print_reg INTEGER,' +
                    'date TEXT,' +
                    'km_start INTEGER,' +
                    'km_end INTEGER,' +
                    'fk_vehicle INTEGER,' +
                    'FOREIGN KEY(fk_vehicle) REFERENCES vehicle(vehicle_id));', []);


                this.addAgency();
                this.databaseReady.next(true);
            });
        });
    }

    getDatabaseState() {
        return this.databaseReady.asObservable();
    }

    getDrivers(): Observable<Driver[]> {
        return this.driver.asObservable();
    }

    getVehicles(): Observable<Vehicle[]> {
        return this.vehicle.asObservable();
    }

    getRegisters(): Observable<Register[]> {
        return this.register.asObservable();
    }

    async addAgency() {
        let res: any;
        await this.database.executeSql('SELECT * FROM agency;', []).then(data => {
            res = data.rows.length;
        });
        if (res === 0) {
            let data = ['04278440278', 'Via Massaua 37', 'Jesolo', '30016', 'VE', 'Talon Marco', '3441158768'];
            const data_1 = await this.database.executeSql('INSERT INTO agency (vat_agency,address_agency,city_agency,cap_agency,province_agency,owner_agency,phone_agency) VALUES (?,?,?,?,?,?,?)', data);
        }
        else {
            console.log("agency already present");

        }

    }

    async getAgency() {
        let query = 'SELECT * FROM agency;';
        return this.database.executeSql(query, []).then(data => {
            return {
                agency_id: data.rows.item(0).agency_id,
                name_agency: data.rows.item(0).name_agency,
                vat_agency: data.rows.item(0).vat_agency,
                address_agency: data.rows.item(0).address_agency,
                city_agency: data.rows.item(0).city_agency,
                cap_agency: data.rows.item(0).cap_agency,
                province_agency: data.rows.item(0).province_agency,
                owner_agency: data.rows.item(0).owner_agency,
                phone_agency: data.rows.item(0).phone_agency,
            };
        });
    }



    async updateAgency(agency_name: string, vat_agency: string, address_agency: string, city_agency: string, cap_agency: string, province_agency: string, owner_agency: string, phone_agency: string) {
        let data = [agency_name, vat_agency, address_agency, city_agency, cap_agency, province_agency, owner_agency, phone_agency];
        const _ = await this.database.executeSql('UPDATE agency SET name_agency = ?, vat_agency = ?, address_agency = ?, city_agency = ?, cap_agency = ?, province_agency = ?, owner_agency = ?, phone_agency = ?', data);
        this.getAgency();

    }

    async addDriver(name: string, surname: string, cf_driver: string, phone: string, email: string, password: string, is_login: number) {
        let data = [name, surname, cf_driver, phone, email, Md5.hashStr(password), is_login = 0];
        const a = await this.database.executeSql('INSERT INTO driver (name,surname,cf_driver,phone,email,password,is_login) VALUES (?,?,?,?,?,?,?)', data);
    }

    async checkEmail(email: string) {
        let result: any;
        let query = 'SELECT * FROM driver WHERE email =' + '\'' + email + '\'' + ';';
        return this.database.executeSql(query, []).then(data => {
            result = data.rows.length;
            return result;
        });

    }

    async checkEmailPassw(email: string, password: any) {
        let result: any;
        let query = 'SELECT * FROM driver WHERE email =' + '\'' + email + '\'' + 'AND password=' + '\'' + password + '\'' + ';';
        return this.database.executeSql(query, []).then(data => {
            result = data.rows.length;
            return result;
        });

    }

    async getDriverEmailPass(email: string, password: any) {
        let query = 'SELECT * FROM driver WHERE email =' + '\'' + email + '\'' + 'AND password=' + '\'' + password + '\'' + ';';
        return this.database.executeSql(query, []).then(data => {
            return {
                driver_id: data.rows.item(0).driver_id,
                name: data.rows.item(0).name,
                surname: data.rows.item(0).surname,
                cf_driver: data.rows.item(0).cf_driver,
                phone: data.rows.item(0).phone,
                email: data.rows.item(0).email,
                password: data.rows.item(0).password,
                is_login: data.rows.item(0).is_login
            };
        });


    }

    async updateIsLogin(id: number) {
        let data = [1, id];
        return this.database.executeSql('UPDATE driver SET is_login = ? WHERE driver_id = ?', data);

    }

    async updateLogut(id: number) {
        let data = [0, id];
        return this.database.executeSql('UPDATE driver SET is_login = ? WHERE driver_id = ?', data);

    }

    async getDriverLogin() {
        let a = [1];
        return this.database.executeSql('SELECT * FROM driver WHERE is_login = ?', a).then(data => {
            return {
                driver_id: data.rows.item(0).driver_id,
                name: data.rows.item(0).name,
                surname: data.rows.item(0).surname,
                cf_driver: data.rows.item(0).cf_driver,
                phone: data.rows.item(0).phone,
                email: data.rows.item(0).email,
                password: data.rows.item(0).password,
                is_login: data.rows.item(0).is_login
            };
        });

    }

    async updateDriver(name: string, surname: string, cf_driver: string, phone: string, email: string) {
        let driverid = await (await this.getDriverLogin()).driver_id;
        let data = [name, surname, cf_driver, phone, email, driverid];
        const _ = await this.database.executeSql('UPDATE driver SET name = ?, surname = ?, cf_driver = ?, phone = ?, email = ? WHERE driver_id = ?', data);
        this.getDriverLogin();

    }

    async addVehicle(car_brand: string, car_model: string, license_plate: string) {
        let driverIdFk = await (await this.getDriverLogin()).driver_id;
        console.log('driver id q' + driverIdFk);
        let data = [car_brand, car_model, license_plate, driverIdFk];
        const a = await this.database.executeSql('INSERT INTO vehicle (car_brand,car_model,license_plate,fk_driver) VALUES (?,?,?,?)', data);
        await this.getAllVehicles();
    }

    async getAllVehicles() {
        let a = [1];
        return this.database.executeSql('SELECT * FROM driver JOIN vehicle ON driver.driver_id = vehicle.fk_driver AND  driver.is_login = ?', a).then(data => {
            let vehicle: Vehicle[] = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    vehicle.push({
                        vehicle_id: data.rows.item(i).vehicle_id,
                        car_brand: data.rows.item(i).car_brand,
                        car_model: data.rows.item(i).car_model,
                        license_plate: data.rows.item(i).license_plate

                    });

                }
            }
            return vehicle;
        });

    }
    async deleteVehicles(vehicle_id: number) {
        await this.database.executeSql('DELETE FROM vehicle WHERE vehicle_id = ?', [vehicle_id]);

    }

    async updateVehicle(vehicle_id:number,car_brand: string, car_model: string, license_plate: string) {
        let driverIdFk = await (await this.getDriverLogin()).driver_id;
        let data = [car_brand, car_model, license_plate,vehicle_id,driverIdFk];
        const query = await this.database.executeSql('UPDATE vehicle SET car_brand = ?, car_model = ?, license_plate = ? WHERE vehicle_id = ? AND fk_driver = ?', data);

      }

   
    async getVehicleId(vehicle_id: number) {
        let query = 'SELECT * FROM driver JOIN vehicle ON driver.driver_id = vehicle.fk_driver WHERE driver.is_login = 1 AND vehicle.vehicle_id=' + '\'' + vehicle_id + '\'' + ';';
        return this.database.executeSql(query, []).then(data => {
            return {
                vehicle_id: data.rows.item(0).vehicle_id,
                car_brand: data.rows.item(0).car_brand,
                car_model: data.rows.item(0).car_model,
                license_plate: data.rows.item(0).license_plate
            }


        });
    }

    async getClients() {
        let data = [1];
        return this.database.executeSql('SELECT c.* FROM client AS c,driver AS d ON d.driver_id = c.fk_driver WHERE d.is_login= ?', data).then(data => {
            let client: Client[] = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    client.push({
                        client_id: data.rows.item(i).client_id,
                        name_client: data.rows.item(i).name_client,
                        surname_client: data.rows.item(i).surname_client,
                        city: data.rows.item(i).city,
                        province: data.rows.item(i).province,
                        is_private: data.rows.item(i).is_private,
                        is_agency: data.rows.item(i).is_agency,
                        cf: data.rows.item(i).cf,
                        vat: data.rows.item(i).surname,
                        billing_notes: data.rows.item(i).billing_notes

                    });
                }
            }
            return client;
        });

    }

    async addClient(name: string, surname: string, city: string, province: string, is_private: number, is_agency: number, cf: string, vat: string, billing_notes: string) {
        let driverIdFk = await (await this.getDriverLogin()).driver_id;
        let data = [name, surname, city, province, is_private, is_agency, cf, vat, billing_notes, driverIdFk];
        const a = await this.database.executeSql('INSERT INTO client (name_client,surname_client,city,province,is_private,is_agency,cf,vat,billing_notes,fk_driver) VALUES (?,?,?,?,?,?,?,?,?,?)', data);

    }

    async updateClient(client_id: number, name: string, surname: string, city: string, province: string, is_private: number, is_agency: number, cf: string, vat: string, billing_notes: string) {
        let data = [name, surname, city, province, is_private, is_agency, cf, vat, billing_notes, client_id];
        const update = await this.database.executeSql('UPDATE client SET name_client = ?, surname_client = ?, city = ?, province = ?, is_private = ?, is_agency = ?, cf = ?, vat = ?, billing_notes = ? WHERE client_id = ?', data);

    }

    async deleteClient(client_id: number) {
        await this.database.executeSql('DELETE FROM client WHERE client_id = ?', [client_id]);

    }

    async getClientData(client_id: number){
        return this.database.executeSql('SELECT * FROM client WHERE client_id = ?', [client_id]).then(data => {
            return {
                client_id: data.rows.item(0).client_id,
                name_client: data.rows.item(0).name_client,
                surname_client: data.rows.item(0).surname_client,
                city: data.rows.item(0).city,
                province: data.rows.item(0).province,
                is_private: data.rows.item(0).is_private,
                is_agency: data.rows.item(0).is_agency,
                cf: data.rows.item(0).cf,
                vat: data.rows.item(0).vat,
                billing_notes: data.rows.item(0).billing_notes,
            };
        });


    }

    //get all travel on this day
    async getTravel(travel_id: number) {
        let query = 'SELECT travel.*,client.*,arrival.*,departure.*,driver.*,vehicle.* ' +
            'FROM travel AS travel ' +
            'JOIN vehicle AS vehicle ON travel.fk_vehicle = vehicle.vehicle_id ' +
            'JOIN driver AS driver ON travel.fk_driver = driver.driver_id ' +
            'JOIN client AS client ON travel.fk_client = client.client_id ' +
            'JOIN arrival AS arrival ON travel.fk_arrival = arrival.arrival_id ' +
            'JOIN departure AS departure ON travel.fk_departure = departure.departure_id ' +
            'WHERE driver.is_login = 1 AND travel.travel_id =' + '\'' + travel_id + '\''
        return this.database.executeSql(query, []).then(data => {
            return {
                travel_id: data.rows.item(0).travel_id,
                is_paid: data.rows.item(0).is_paid,
                n_pass: data.rows.item(0).n_passenger,
                km_tot: data.rows.item(0).km_tot,
                date: data.rows.item(0).date,
                hour: data.rows.item(0).hour,
                fk_departure: data.rows.item(0).fk_departure,
                fk_arrival: data.rows.item(0).fk_arrival,
                fk_client: data.rows.item(0).fk_client,
                name_client: data.rows.item(0).name_client,
                surname_client: data.rows.item(0).surname_client,
                billing_notes_client: data.rows.item(0).billing_notes,
                name_arrival: data.rows.item(0).name_arr,
                lat_arr: data.rows.item(0).lat_arr,
                long_arr: data.rows.item(0).long_arr,
                address_arrival: data.rows.item(0).address_arr,
                name_departure: data.rows.item(0).name_dep,
                lat_dep: data.rows.item(0).lat_dep,
                long_dep: data.rows.item(0).long_dep,
                address_departure: data.rows.item(0).address_dep,
                notes_travel: data.rows.item(0).notes_travel,
                fk_vehicle: data.rows.item(0).fk_vehicle,
                car_brand: data.rows.item(0).car_brand,
                car_model: data.rows.item(0).car_model,
                licence_plate: data.rows.item(0).license_plate,
                name_driver: data.rows.item(0).name,
                surname_driver: data.rows.item(0).surname,

            }

        });

    }
    async getTravelisPaidDate(date: string, is_paid: number) {
        let query = 'SELECT travel.*,client.*,departure.*,arrival.*,driver.*,vehicle.* ' +
            'FROM travel AS travel ' +
            'JOIN vehicle AS vehicle ON travel.fk_vehicle = vehicle.vehicle_id ' +
            'JOIN driver AS driver ON travel.fk_driver = driver.driver_id ' +
            'JOIN client AS client ON travel.fk_client = client.client_id ' +
            'JOIN departure AS departure ON departure.departure_id = travel.fk_departure AND departure.fk_driver = driver.driver_id ' +
            'JOIN arrival AS arrival ON arrival.arrival_id = travel.fk_arrival AND arrival.fk_driver = driver.driver_id ' +
            'WHERE driver.is_login = 1 AND travel.date =' + '\'' + date + '\'' + 'AND travel.is_paid=' + '\'' + is_paid + '\' AND departure.fk_driver = driver.driver_id AND arrival.fk_driver = driver.driver_id ' +
            'ORDER BY travel.hour ASC;'
        console.log("queryyyy" + query);
        return this.database.executeSql(query, []).then(data => {
            let travel: Travel[] = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    travel.push({
                        travel_id: data.rows.item(i).travel_id,
                        is_paid: data.rows.item(i).is_paid,
                        n_pass: data.rows.item(i).n_passenger,
                        km_tot: data.rows.item(i).km_tot,
                        date: data.rows.item(i).date,
                        hour: data.rows.item(i).hour,
                        fk_departure: data.rows.item(i).fk_departure,
                        fk_arrival: data.rows.item(i).fk_arrival,
                        fk_client: data.rows.item(i).fk_client,
                        name_client: data.rows.item(i).name_client,
                        surname_client: data.rows.item(i).surname_client,
                        billing_notes_client: data.rows.item(i).billing_notes,
                        name_arrival: data.rows.item(i).name_arr,
                        lat_arr: data.rows.item(i).lat_arr,
                        long_arr: data.rows.item(i).long_arr,
                        address_arrival: data.rows.item(i).address_arr,
                        name_departure: data.rows.item(i).name_dep,
                        lat_dep: data.rows.item(i).lat_dep,
                        long_dep: data.rows.item(i).long_dep,
                        address_departure: data.rows.item(i).address_dep,
                        notes_travel: data.rows.item(i).notes_travel,
                        fk_vehicle: data.rows.item(i).fk_vehicle,
                        car_brand: data.rows.item(0).car_brand,
                        car_model: data.rows.item(i).car_model,
                        licence_plate: data.rows.item(i).license_plate,
                        name_driver: data.rows.item(i).name,
                        surname_driver: data.rows.item(i).surname,
                    });
                }
            }
            return travel;
        });

    }


    async getAllTravel(date:string){

        let query = 'SELECT travel.*,client.*,departure.*,arrival.*,driver.*,vehicle.* ' +
        'FROM travel AS travel ' +
        'JOIN vehicle AS vehicle ON travel.fk_vehicle = vehicle.vehicle_id ' +
        'JOIN driver AS driver ON travel.fk_driver = driver.driver_id ' +
        'JOIN client AS client ON travel.fk_client = client.client_id ' +
        'JOIN departure AS departure ON departure.departure_id = travel.fk_departure AND departure.fk_driver = driver.driver_id ' +
        'JOIN arrival AS arrival ON arrival.arrival_id = travel.fk_arrival AND arrival.fk_driver = driver.driver_id ' +
        'WHERE driver.is_login = 1 AND travel.date =' + '\'' + date + '\'' + 'AND departure.fk_driver = driver.driver_id AND arrival.fk_driver = driver.driver_id ' +
        'ORDER BY travel.hour ASC;'
    return this.database.executeSql(query, []).then(data => {
        let travel: Travel[] = [];
        if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
                travel.push({
                    travel_id: data.rows.item(i).travel_id,
                    is_paid: data.rows.item(i).is_paid,
                    n_pass: data.rows.item(i).n_passenger,
                    km_tot: data.rows.item(i).km_tot,
                    date: data.rows.item(i).date,
                    hour: data.rows.item(i).hour,
                    fk_departure: data.rows.item(i).fk_departure,
                    fk_arrival: data.rows.item(i).fk_arrival,
                    fk_client: data.rows.item(i).fk_client,
                    name_client: data.rows.item(i).name_client,
                    surname_client: data.rows.item(i).surname_client,
                    billing_notes_client: data.rows.item(i).billing_notes,
                    name_arrival: data.rows.item(i).name_arr,
                    lat_arr: data.rows.item(i).lat_arr,
                    long_arr: data.rows.item(i).long_arr,
                    address_arrival: data.rows.item(i).address_arr,
                    name_departure: data.rows.item(i).name_dep,
                    lat_dep: data.rows.item(i).lat_dep,
                    long_dep: data.rows.item(i).long_dep,
                    address_departure: data.rows.item(i).address_dep,
                    notes_travel: data.rows.item(i).notes_travel,
                    fk_vehicle: data.rows.item(i).fk_vehicle,
                    car_brand: data.rows.item(0).car_brand,
                    car_model: data.rows.item(i).car_model,
                    licence_plate: data.rows.item(i).license_plate,
                    name_driver: data.rows.item(i).name,
                    surname_driver: data.rows.item(i).surname,
                });
            }
        }
        return travel;
    });



    }





    async checkArrival_present(address: string) {
        let driver_id = (await this.getDriverLogin()).driver_id
        let res: any;
        let query = 'SELECT * FROM arrival WHERE address_arr =' + '\'' + address + '\'' + 'AND fk_driver=' + '\'' + driver_id + '\'';
        return this.database.executeSql(query, []).then(data => {
            res = data.rows.length;
            return res;
        });


    }
    async checkDep_present(address: string) {
        let driver_id = (await this.getDriverLogin()).driver_id
        let res: any;
        let query = 'SELECT * FROM departure WHERE address_dep =' + '\'' + address + '\''  + 'AND fk_driver=' + '\'' + driver_id + '\'';
        return this.database.executeSql(query, []).then(data => {
            res = data.rows.length;
            return res;
        });


    }
    //km_tot?
    async addTravel(address_dep: string, address_arr: string, hour: string, date: string, n_pass: string, client_id: number, is_paid: number) {
        //let result_row_arrival = await this.checkArrival_present(address_arr);
        let arrival_id: any;
        let departure_id: any;
        let query_arr = 'SELECT arrival_id FROM arrival WHERE address_arr =' + '\'' + address_arr + '\'';
        const a = await this.database.executeSql(query_arr, []).then(data => {
            arrival_id = data.rows.item(0).arrival_id

        });

        let query_dep = 'SELECT departure_id FROM departure WHERE address_dep =' + '\'' + address_dep + '\'';
        console.error("queryy" + query_dep);
        const b = await this.database.executeSql(query_dep, []).then(data => {
            departure_id = data.rows.item(0).departure_id
        });

        let vehicleid = await (await this.getRegister(this.mydate)).fk_vehicle
        let driverid = await (await this.getDriverLogin()).driver_id;
        const query_main = await this.database.executeSql('INSERT INTO travel (is_paid,n_passenger,date,hour,fk_departure,fk_arrival,fk_client,fk_driver,fk_vehicle)' +
            'VALUES (?,?,?,?,?,?,?,?,?)', [is_paid, n_pass, date, hour, departure_id, arrival_id, client_id, driverid, vehicleid]);
    }

    //ADD ARRIVAL WITH NO MAP
    async addArrival(name_arr: string, address: string) {
        let driverid = await (await this.getDriverLogin()).driver_id;
        let data = [name_arr, address, driverid];
        let res: any;
        await this.database.executeSql('INSERT INTO arrival (name_arr,address_arr,fk_driver) VALUES (?,?,?)', data).then((row: any) => {
            console.log('ID ARRIVO', row.insertId);
            res = row.insertId;

        })
        return res;
    }
    //ADD DEPARTURE WITH NO MAP
    async addDeparture(name_dep: string, address: string) {
        let driverid = await (await this.getDriverLogin()).driver_id;
        let data = [name_dep, address, driverid];
        let res: any;
        await this.database.executeSql('INSERT INTO departure (name_dep,address_dep,fk_driver) VALUES (?,?,?)', data).then((row: any) => {
            console.log('ID DEP', row.insertId);
            res = row.insertId;
        })
        return res;
    }

    async cancelTravel(travel_id: number) {
        let fk_arr = await (await this.getTravel(travel_id)).fk_arrival;
        let fk_dep = await (await this.getTravel(travel_id)).fk_departure;
        let fk_client = await (await this.getTravel(travel_id)).fk_client;
        await this.database.executeSql('DELETE FROM arrival WHERE arrival_id = ?', [fk_arr]);
        await this.database.executeSql('DELETE FROM departure WHERE departure_id = ?', [fk_dep]);
        await this.database.executeSql('DELETE FROM client WHERE client_id = ?', [fk_client]);
        await this.database.executeSql('DELETE FROM travel WHERE travel_id = ?', [travel_id]);


    }

    async getArrivals() {
        let query = 'SELECT arrival.*,driver.* ' +
            'FROM arrival AS arrival ' +
            'JOIN driver AS driver ON arrival.fk_driver = driver.driver_id ' +
            'WHERE driver.is_login = 1';

        return this.database.executeSql(query, []).then(data => {
            let arrival: Arrival[] = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    arrival.push({
                        arrival_id: data.rows.item(i).arrival_id,
                        name_arr: data.rows.item(i).name_arr,
                        lat_arr: data.rows.item(i).lat_arr,
                        long_arr: data.rows.item(i).long_arr,
                        address_arr: data.rows.item(i).address_arr
                    });

                }
            }
            return arrival;
        });
    }

    
    async getArrivalData(arrival_id:number){
        return this.database.executeSql('SELECT * FROM arrival WHERE arrival_id = ?', [arrival_id]).then(data => {
            return {
                arrival_id: data.rows.item(0).arrival_id,
                name_arr: data.rows.item(0).name_arr,
                lat_arr: data.rows.item(0).lat_arr,
                long_arr: data.rows.item(0).long_arr,
                address_arr: data.rows.item(0).address_arr,
                
            };
        });
    }

    async getDepartures() {
        let query = 'SELECT departure.*,driver.* ' +
            'FROM departure AS departure ' +
            'JOIN driver AS driver ON departure.fk_driver = driver.driver_id ' +
            'WHERE driver.is_login = 1';

        return this.database.executeSql(query, []).then(data => {
            let departure: Departure[] = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    departure.push({
                        departure_id: data.rows.item(i).departure_id,
                        name_dep: data.rows.item(i).name_dep,
                        lat_dep: data.rows.item(i).lat_dep,
                        long_dep: data.rows.item(i).long_dep,
                        address_dep: data.rows.item(i).address_dep
                    });

                }
            }
            return departure;
        });
    }



    async getDepartureData(departure_id:number){
        return this.database.executeSql('SELECT * FROM departure WHERE departure_id = ?', [departure_id]).then(data => {
            return {
                departure_id: data.rows.item(0).departure_id,
                name_dep: data.rows.item(0).name_dep,
                lat_dep: data.rows.item(0).lat_dep,
                long_dep: data.rows.item(0).long_dep,
                address_dep: data.rows.item(0).address_dep,
                
            };
        });
    }
    async addRegister(print_reg: number, date: string, km_start: number, km_end: number, fk_Idvehicle: number) {
        let data = [print_reg, date, km_start, km_end, fk_Idvehicle];
        const query = await this.database.executeSql('INSERT INTO register (print_reg,date,km_start,km_end,fk_vehicle) VALUES (?,?,?,?,?)', data);


    }
    async checkRegister_present(date: string) {
        let res: any;
        let query = 'SELECT register.* FROM register AS register WHERE register.date=' + '\'' + date + '\'';
        return this.database.executeSql(query, []).then(data => {
            res = data.rows.length;
            return res;
        });
    }

    async getRegister(date: string) {
        let query = 'SELECT register.* FROM register AS register WHERE register.date=' + '\'' + date + '\'';
        console.log("queryyy" + query);
        return this.database.executeSql(query, []).then(data => {
            console.log("data" + data.rows.item(0).fk_vehicle);
            return {
                register_id: data.rows.item(0).register_id,
                print_reg: data.rows.item(0).print_reg,
                date: data.rows.item(0).date,
                km_start: data.rows.item(0).km_start,
                km_end: data.rows.item(0).km_end,
                fk_vehicle: data.rows.item(0).fk_vehicle,
            }




        });
    }

    async updateRegister(print_reg: number, date: string, register_id: number, km_start: string, km_end: string, fk_vehicle: number) {
        let data = [print_reg, date, km_start, km_end, fk_vehicle, register_id]
        const _ = await this.database.executeSql('UPDATE register SET print_reg = ?, date = ?, km_start = ?, km_end = ?, fk_vehicle = ? WHERE register_id = ?', data);

    }





}
