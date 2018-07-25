import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpEvent} from '@angular/common/http';
import { RestCallService } from '../../service/restCall.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EmployeeService {

  empList = {};

  constructor(private restCallService: RestCallService) {
  }
    
    getAllEmployee (callback){
        console.log("getAllEmployee");
        this.restCallService.getRest(null,null,'user',callback);
        
    }
    getEmployee (id){
    
    }
    postEmployee(data,callback){
        this.restCallService.postRest('user/add',data,callback);
    }
    putEmployee(id,data,callback){
         console.log("putEmployee");
        this.restCallService.putRest(id,'user',data,callback);
    }
    deleteEmployee(id,callback){
        this.restCallService.deleteRest(id,'user',callback);
    }
    //User Role
    getRole (callback){
        this.restCallService.getRest(null,null,'user/role',callback);
    }
    
      pushFileToStorage(file: File) {
        return this.restCallService.pushFileToStorage(file,'dpImg','user/uploadDP');
      }
  
   DATA = [
    ];
    
    setData(data){
        this.DATA = data;
    }
    getData(){
        console.log(this.DATA);
        return this.DATA;
    }
    getUser(id){
    console.log("ID : "+id);
    console.log(this.DATA);
    for(var i=0;i<this.DATA.length;i++){
        var user = this.DATA[i];
        console.log("ID : ",user);
        if(user.id = id){
            return user;
        }
    }
    }

}