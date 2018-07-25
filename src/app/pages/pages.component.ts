import { Component } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent {

constructor(public _globalService: GlobalService) { }

  ngOnInit() {
    console.log("Pages Auth: ");
    //console.log(this._globalService.getAuthKey());//.subscribe(val=>console.log(val));
    /*this._globalService.auth$.subscribe(data => {
      console.log(data);
    }, error => {
      console.log('Error: ' + error);
    });*/
  }
}
