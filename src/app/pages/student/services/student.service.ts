import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpEvent} from '@angular/common/http';
import { RestCallService } from '../../service/restCall.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StudentService {

  empList = {};

  constructor(private restCallService: RestCallService) {
  }
    
    getAll (id,callback){
        console.log("getAllEmployee");
        if(id){
            this.restCallService.getRest(id,null,'student',callback);
        }else{
            this.restCallService.getRest(null,null,'student',callback);
        }
        
        
    }
    post(data,callback){
        this.restCallService.postRest('student/add',data,callback);
    }
    put(id,data,callback){
         console.log("putEmployee");
        this.restCallService.putRest('student/update',data,callback);
    }
    delete(id,callback){
        this.restCallService.deleteRest(id,'student',callback);
    }

    getClassList(id,callback){
        this.restCallService.getRest(id,null,'class/school',callback);
    }

    // getUnMappedUser(id,callback){
    //     this.restCallService.getRest(id,null,'class/unmappedUser',callback);
    // }
    //User Role
    // getRole (callback){
    //     this.restCallService.getRest(null,null,'user/role',callback);
    // }
    
    //   pushFileToStorage(file: File) {
    //     return this.restCallService.pushFileToStorage(file,'dpImg','user/uploadDP');
    //   }
  
   DATA = [
    ];
    
    setData(data){
        this.DATA = data;
    }
    getData(){
        console.log(this.DATA);
        return this.DATA;
    }
    getClasses(id){
    console.log("ID : "+id);
    console.log(this.DATA);
    for(var i=0;i<this.DATA.length;i++){
        var clsss = this.DATA[i];
        console.log("ID : ",clsss);
        if(clsss.id = id){
            return clsss;
        }
    }
    }

}