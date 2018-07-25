import { Component } from '@angular/core';
import { GlobalService } from './shared/services/global.service';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'app';
  constructor(public _globalService: GlobalService) { }

  ngOnInit() {
    console.log("Auth: ");
    //console.log(this._globalService.getAuthKey());//.subscribe(val=>console.log(val));
    /*this._globalService.auth$.subscribe(data => {
      console.log(data);
    }, error => {
      console.log('Error: ' + error);
    });*/
  }
}
