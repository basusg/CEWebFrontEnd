import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// setting new item
//localStorage.setItem('MyApp_Auth', JSON.stringify(cred));
// getting item
/*let auth;
if (localStorage.getItem('MyApp_Auth'))
   auth = localStorage.getItem('MyApp_Auth');*/

// removing
//localStorage.removeItem('MyApp_Auth');

// clear all data
//localStorage.clear();

@Injectable()
export class AuthService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }
    headers=new HttpHeaders({});
    isAuthenticate(){
        return  this.authenticated;
    }
  
  authenticate(credentials, callback) {
console.log(credentials);
var cred = {};
if(credentials.authorization){
    cred = credentials ? credentials: {};
}else{
    cred = credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password),
            'content-type' : 'application/json',
            accept : 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':'true',
            withCredentials:'true'
        }: {};
}
localStorage.setItem('MyApp_Auth', JSON.stringify(cred));

        const headers = new HttpHeaders(cred);
        this.headers = headers;
        console.log(headers);
        this.http.get('http://localhost:8080/user/loggedUser', {headers: headers}).subscribe(response => {
        console.log("Res:");
        console.log("Res: ",response);
        
            if (response['name']) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback(response);
        }
        ,error => {
        console.log("error");
        
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            //return callback && callback();
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log('Backend returned code ${error.status} body was:');
            console.log(error.error);
            console.log(error.status);
            if(error.status==0){
                alert("server Not found");
                return;
            }

            if(error.error){
                if(error.error+"".indexOf("401")){
                    alert("Username or Password incorrect");
                }else{
                    alert("server did not reached");
                }
            }
            localStorage.removeItem('MyApp_Auth');
          }
          // return an observable with a user-facing error message
          //return throwError(
            //'Something bad happened; please try again later.');
        }
        );

    }

}