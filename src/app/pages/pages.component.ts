import { Component } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent {

constructor(private auth: AuthService, private router: Router,public _globalService: GlobalService) { }

  ngOnInit() {
    console.log("Pages Auth: ");
    //console.log(this._globalService.getAuthKey());//.subscribe(val=>console.log(val));
    /*this._globalService.auth$.subscribe(data => {
      console.log(data);
    }, error => {
      console.log('Error: ' + error);
    });*/

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
            //obj.router.navigate(['/pages']);
        });
    }else{
      obj.router.navigate(['/login']);
    }
  }
}
