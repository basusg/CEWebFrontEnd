import { Injectable } from '@angular/core';

@Injectable()
export class ListUserService {
    constructor() { }

    DATA = [
    ];
    
    setData(data){
        this.DATA = data;
    }
    getData(){
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
