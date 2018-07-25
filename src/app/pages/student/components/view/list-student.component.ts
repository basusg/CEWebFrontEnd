import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {Router} from "@angular/router";
//import { ListUserService } from './list-user.service';
//import { RestCallService } from '../../../service/restCall.service';
import { ClassService } from '../../services/student.service';
import {FormBuilder, FormGroup, FormArray,FormControl, Validators} from '@angular/forms';

import { GlobalService } from '../../../../shared/services/global.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
  providers: [ClassService]
})
export class ListStudentComponent implements OnInit {
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
      this.classService.getAll(function(res){
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
      this.getUnMappedUser();
      var classes = this.classService.getClasses(id);
      this.form = this.fb.group({
        id : classes.id,
        name:classes.name,
        schoolId:classes.schoolId,
        description: classes.description,
        user:classes.user.email,
        mappedUser: classes.user.member.firstName+", "+classes.user.member.lastName,
        status:true
      });
      this.isAddUser=false;
      this.isEditUser=true;
      this.isListUser=false;
      this.classData = classes;
    }

    onSubmit(value) {
      console.log("onSubmit");
      console.log(value);
      var obj = this;
      var classes = {
        id : value.id,
        name:value.name,
        schoolId:this.schoolId,
        description: value.description,
        user:{
          email:value.user
        },
        status:true
      }
      console.log(value.id);
      if(value.id){
        this.classService.put(classes.id,classes,function(){
          obj.router.navigate(['pages/class']);
          obj.isAddUser=false;
          obj.isEditUser=false;
          obj.isListUser=true;
          obj.loadData();

        });
        }else{
            this.classService.post(classes,function(){
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
          obj.unMappedUsers = res;
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
      user:""
   });
    }

    resetForm(){
     
    }

    deleteUser(){
      
      if(this.classData && this.classData.id){
          this.classService.delete(this.classData.id,function(res){
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

