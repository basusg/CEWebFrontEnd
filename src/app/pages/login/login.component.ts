import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 data = {
    username: '',
    password: ''
  };
  constructor(private auth: AuthService, private http: HttpClient, private router: Router,public _globalService: GlobalService) {
      //this.auth.authenticate(undefined, undefined);
      console.log("cons: "+this.data.username+":"+this.data.password);
    }
    login(){
    //console.log(this.username);
    console.log("cons: "+this.data.username+":"+this.data.password);
    console.log('Basic ' + btoa(this.data.username + ':' + this.data.password));
    var obj = this;
    //this._globalService.setAuthKey('Basic ' + btoa(this.data.username + ':' + this.data.password));
    var cred = {username:this.data.username,password: this.data.password};
        this.auth.authenticate(cred,function(user){
            // setting new item
        localStorage.setItem('loggedUser', JSON.stringify(user));
            obj.router.navigate(['/pages']);
        });
    }
    logout() {
      this.http.post('logout', {}).finally(() => {
          this.auth.authenticated = false;
          this.router.navigateByUrl('/login');
      }).subscribe();
    }

  ngOnInit() {
  //console.log("Init",this.auth.isAuthenticate());
  
  let auth;
    if (localStorage.getItem('MyApp_Auth'))
       auth = localStorage.getItem('MyApp_Auth');
   var obj = this;
    if(auth){
        this.auth.authenticate(JSON.parse(auth),function(user){
        console.log("MNB Success Call back");
        // setting new item
        localStorage.setItem('loggedUser', JSON.stringify(user));
        //obj._globalService.userBusChanged(user);
            obj.router.navigate(['/pages']);
        });
    }
  
  }

}
