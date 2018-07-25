import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ListUserService } from '../list-user/list-user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers: [ListUserService]
})
export class ViewUserComponent implements OnInit {

  //default_data: Array<any>;
  userId=0;
  userData;
  constructor(private route: ActivatedRoute,private listUser:ListUserService) {
  var obj = this;
    this.route.params.subscribe( params => {
    console.log(params);
    obj.userId = params.id;
    console.log(obj.listUser.getUser(obj.userId));
    obj.userData = obj.listUser.getUser(obj.userId);
    });
  }

  ngOnInit() {
    /*this.default_data = [
      { first_name: 'Steve', last_name: 'Jobs', user_name: '@steve' },
      { first_name: 'Simon', last_name: 'Philips', user_name: '@simon' },
      { first_name: 'Jane', last_name: 'Doe', user_name: '@jane' },
      { first_name: 'Larry', last_name: 'Thornton', user_name: '@larry' },
      { first_name: 'Hiver', last_name: 'Choe', user_name: '@hiver' },
    ];*/
    
    
  }

}
