import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpEvent} from '@angular/common/http';
import { RestCallService } from '../../service/restCall.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StoryService {

  empList = {};

  constructor(private restCallService: RestCallService) {
  }
  getHeader(){
      return this.restCallService.getHeader();
  }
    getAllEmployee (id,callback){
        console.log("getAllEmployee");
        if(id){
            this.restCallService.getRest(id,null,'member',callback);
        }else{
            this.restCallService.getRest(null,null,'member',callback);
        }
    }

    getAllChildren (id,callback){
        console.log("getAllChildren");
        if(id){
            this.restCallService.getRest(id,null,'student/list',callback);
        }else{
            this.restCallService.getRest(null,null,'student/list',callback);
        }
    }

    getTagsByUser (id,callback){
        console.log("getAllLearning");
        if(id){
            this.restCallService.getRest(id,null,'learningTags/user',callback);
        }else{
            this.restCallService.getRest(null,null,'learningTags',callback);
        }
    }

    getTagsBySchool (id,callback){
        console.log("getAllChildren");
        if(id){
            this.restCallService.getRest(id,null,'learningTags/school',callback);
        }else{
            this.restCallService.getRest(null,null,'learningTags',callback);
        }
    }

    postLearningTag (data,callback){
        console.log("addLearingTag");
        // if(id){
            this.restCallService.postRest('learningTags/add',data,callback);
        // }else{
        //     this.restCallService.getRest(null,null,'learningTags',callback);
        // }
    }

    getEmployee (id){
    
    }
    postStory(data,callback){
        this.restCallService.postRest('story/add',data,callback);
    }
    putStory(data,callback){
         console.log("putEmployee");
        this.restCallService.putRest('member/update',data,callback);
    }
    deleteStory(id,callback){
        this.restCallService.deleteRest(id,'member',callback);
    }
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