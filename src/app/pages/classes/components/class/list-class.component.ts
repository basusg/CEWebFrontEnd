import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {Router} from "@angular/router";
//import { ListUserService } from './list-user.service';
//import { RestCallService } from '../../../service/restCall.service';
import { ClassService } from '../../services/class.service';
import {FormBuilder, FormGroup, FormArray,FormControl, Validators} from '@angular/forms';

import { GlobalService } from '../../../../shared/services/global.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.scss'],
  providers: [ClassService]
})
export class ListClassComponent implements OnInit {
  tableData: Array<any>;
  isListUser=false;
  isEditUser=false;
  isAddUser=false;

  form:FormGroup;

  classData;
  unMappedUsers;

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  schoolId;
    constructor(private classService: ClassService,private router:Router,private fb:FormBuilder,public _globalService: GlobalService){
      this.isListUser=true;
      this.form = this.fb.group({
        id:0,
        name:"",
        description:"",
        status:"",
        user:""
     });
     var userLocal = localStorage.getItem('loggedUser');//, JSON.stringify(user));
      if(userLocal){
        var user = JSON.parse(userLocal);
        this.schoolId = user.schoolId;
      }
    }
    ngOnInit(){
      this.loadData();
    }

    loadData() {
      console.log("onload");
      var obj = this;
      this.classService.getAllClass(null,function(res){
        console.log('callback');
        
          obj.classService.setData(res);
          //this.empList = res;
          obj.tableData = res;
          obj.isListUser=true;
          obj.isEditUser=false;
        
        //console.log(obj.employeeService.getData());
        });
    }

    openClasses(id){
      var obj = this;
      this.classService.getAllClass(id,function(res){
        console.log(res);
        obj.form = obj.fb.group({
        id:0,
        name:"",
        description:"",
        status:"",
        user:""
     });
     obj.getUnMappedUser();
      //var classes = this.classService.getClasses(id);
      obj.form = obj.fb.group({
        id : res.id,
        name:res.name,
        schoolId:res.schoolId,
        description: res.description,
        member:res.member.id,
        mappedUser: res.member.firstName+", "+res.member.lastName,
        status:true
      });
      obj.isAddUser=false;
      obj.isEditUser=true;
      obj.isListUser=false;
      obj.classData = res;
    });
    }

    onSubmit(value) {
      console.log("onSubmit");
      console.log(value);
      var obj = this;
      var memberId = value.member;
      console.log("memberId "+memberId);
      if(memberId && memberId==0){
        memberId = value.mappedUser;
      }
      console.log(memberId);
      debugger;
      var classes = {
        id : value.id,
        name:value.name,
        schoolId:this.schoolId,
        description: value.description,
        member:{
          id:memberId
        },
        status:true
      }
      console.log(value.id);
      if(value.id){
        this.classService.putClass(classes.id,classes,function(){
          obj.router.navigate(['pages/class']);
          obj.isAddUser=false;
          obj.isEditUser=false;
          obj.isListUser=true;
          obj.loadData();

        });
        }else{
            this.classService.postClass(classes,function(){
                obj.router.navigate(['pages/class']);
                obj.isAddUser=false;
                obj.isEditUser=false;
                obj.isListUser=true;
                obj.loadData();
            });
        }
      
    }

    getUnMappedUser(){
      var obj = this;
      if(this.schoolId){
        
        //schoolId = this._globalService.loggedUser$.subscribe
        this.classService.getUnMappedUser(this.schoolId,function(res){
          console.log("MNB");
          obj.unMappedUsers = res;
          obj.unMappedUsers.unshift({id:0,lastName:'Select one'});
        });
      }
    }

    addUser(){
      this.getUnMappedUser();
    this.isAddUser=true;
    this.isEditUser=false;
    this.isListUser=false;
    this.classData = null;
    this.form = this.fb.group({
      id:0,
      name:"",
      description:"",
      status:"",
      member:""
   });
    }

    resetForm(){
     
    }

    deleteUser(){
      
      if(this.classData && this.classData.id){
          this.classService.deleteClass(this.classData.id,function(res){
              console.log("Delete Success")
          });
      }else{
          alert("invalid request");
      }
      //this.isListUser=true;
      //this.isEditUser=false;
      this.loadData();
    }

    pageChanged(pN: number): void {
      this.pageNumber = pN;
    }
}

