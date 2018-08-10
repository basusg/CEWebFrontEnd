import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpEvent} from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RestCallService {

  authenticated = false;
  hostURL = "http://localhost:8080/"
  constructor(private http: HttpClient,private auth: AuthService) {
  }
    
    getHeader (){
        let auth;
        if (localStorage.getItem('MyApp_Auth'))
            auth = localStorage.getItem('MyApp_Auth');
        console.log(auth)
        return auth;
    }
    
    getRest(id,data,url,callback){
    
        url = this.hostURL+url;
        if(id){
        url= url+'/'+id;
        }
        console.log("URL "+url);
        console.log(this.getHeader())
        let cred = this.getHeader() ? JSON.parse(this.getHeader()) : {};
        const headers = new HttpHeaders(cred);
        this.http.get(url,{headers : headers}).subscribe(response => {
            console.log('success');
            console.log(response)
            return callback && callback(response,true);
        },error => {
            console.log('error')
            console.log(error);
            if(error.error){
                if(error.error+"".indexOf("401")){
                    alert("Username or Password incorrect");
                }else{
                    alert("server did not reached");
                }
            }else{
                alert("server did not reached");
            }
            // return callback && callback(error,false);
        });
    }
    postRest(url,data,callback){
    console.log(data);
        url = this.hostURL+url;
        console.log("URL"+url);
        console.log(this.getHeader())
        let cred = this.getHeader() ? JSON.parse(this.getHeader()) : {};
        const headers = new HttpHeaders(cred);
        this.http.post(url,data,{headers : headers}).subscribe(response => {
            console.log('success');
            console.log(response)
            return callback && callback(response,true);
        },error => {
            console.log('error')
            console.log(error);
            if(error.error){
                if(error.error+"".indexOf("401")){
                    alert("Username or Password incorrect");
                }else{
                    alert("server did not reached");
                }
            }else{
                alert("server did not reached");
            }
            // return callback && callback(error,false);
        });
    }
    putRest(url,data,callback){
    
    url = this.hostURL+url;
        // if(id){
        //     url= url+'/'+id;
        // }
        console.log("URL"+url);
       console.log(this.getHeader())
        let cred = this.getHeader() ? JSON.parse(this.getHeader()) : {};
        const headers = new HttpHeaders(cred);
    
        this.http.put(url, data,{headers : headers}).subscribe(response => {
            console.log('success');
            console.log(response)
            return callback && callback(response,true);
        },error => {
            console.log('error')
            console.log(error);
            if(error.error){
                if(error.error+"".indexOf("401")){
                    alert("Username or Password incorrect");
                }else{
                    alert("server did not reached");
                }
            }else{
                alert("server did not reached");
            }
            // return callback && callback(error,false);
        });
    }
    deleteRest(id,url,callback){
        url = this.hostURL+url;
        if(id){
            url= url+'/'+id;
        }
        console.log(this.getHeader())
        let cred = this.getHeader() ? JSON.parse(this.getHeader()) : {};
        const headers = new HttpHeaders(cred);
        
        this.http.delete(url,{headers : headers}).subscribe(response => {
            console.log('success');
            console.log(response)
            return callback && callback(response,true);
        },error => {
            console.log('error')
            console.log(error);
            if(error.status==200){
                return;
            }
            if(error.error){
                if(error.error+"".indexOf("401")){
                    alert("Username or Password incorrect");
                }else{
                    alert("server did not reached");
                }
            }else{
                alert("server did not reached");
            }
            // return callback && callback(error,false);
        });
    }
    
    pushFileToStorage(file,field,url){
        url = this.hostURL+url;
        
        let formdata: FormData = new FormData();

        formdata.append(field, file);
        
        console.log(this.getHeader())
        let cred = this.getHeader() ? JSON.parse(this.getHeader()) : {};
        const headers = new HttpHeaders(cred);

        return this.http.post(url, {headers:headers}).subscribe(
            data => {
                console.log("data",data);
            },error => {
                console.log(error);
            }
        );
    }
}