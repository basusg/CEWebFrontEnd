import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
/* models */
/* import { TabMenuModel } from '../models/tabs-model';
import { NotificationModel } from '../models/notification-model'; */

@Injectable()
export class GlobalService {
    private dataSource = new Subject<DataSourceClass>();
    private authSource = new Subject<AuthSourceClass>();
    private loggedUserSource = new Subject<LoggedUser>();

    data$ = this.dataSource.asObservable();
    //auth$ = this.authSource.asObservable();
    loggedUser$ = this.loggedUserSource.asObservable();
    
    public setAuthKey(key) {
    console.log("Auth bus change");
    console.log(key);
        this.authSource.next({
            authKey: key
        })
    }
    
    public getAuthKey() {
        return this.authSource;
    }

    public dataBusChanged(ev, value) {
    console.log("Data bus change");
    console.log(ev+":",value);
        this.dataSource.next({
            ev: ev,
            value: value
        })
    }
    
    public userBusChanged(user) {
        console.log("User bus change");
        console.log(user);
            this.loggedUserSource.next(user)
        }
    }

export class AuthSourceClass {
    authKey:string;
}

export class DataSourceClass {
    ev: string;
    value: any
}

export class LoggedUser {
    id:number;
    schoolId:number;
    assignedRole: string;
    createdBy: number;
    createdTime:number;
    dpImg:string;
    email:string;
    firstName:string;
    middleName:string;
    lastName:string;
    roles:any;
}