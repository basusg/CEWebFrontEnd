import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {Router} from "@angular/router";
//import { ListUserService } from './list-user.service';
//import { RestCallService } from '../../../service/restCall.service';
import { StudentService } from '../../services/student.service';
import {FormBuilder, FormGroup, FormArray,FormControl, Validators} from '@angular/forms';

import { GlobalService } from '../../../../shared/services/global.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
  providers: [StudentService]
})
export class ListStudentComponent implements OnInit {
  tableData: Array<any>;
  isListUser=false;
  isEditUser=false;
  isAddUser=false;

  form:FormGroup;

  classData;
  parentData;
  userData;

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  schoolId;
    constructor(private studentService: StudentService,private router:Router,private fb:FormBuilder,public _globalService: GlobalService){
      this.isListUser=true;
      this.form = this.fb.group({
        id:0,
        firstName:"",
        middleName:"",
        lastName:"",
        status:true,
        parentId:"",
        parentEmail:"",
        parentFirstName:"",
        parentMiddleName:"",
        parentLastName:"",
        classesId:"",
        classesName:""
        
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
      this.studentService.getAll(null,function(res){
        console.log('callback');
        obj.studentService.setData(res);
        //this.empList = res;
        obj.tableData = res;
        obj.isListUser=true;
        obj.isEditUser=false;
        //console.log(obj.employeeService.getData());
        });
    }

    openClasses(id){
      var obj = this;
      this.getClassList(function(){
        var classes = obj.studentService.getAll(id,function(res){
          if(res){
            obj.form = obj.fb.group({
              id:res.id,
              firstName:res.firstName,
              middleName:res.middleName,
              lastName:res.lastName,
              status:res.status,
              parentId:res.parent.id,
              parentEmail:res.parent.user.email,
              parentFirstName:res.parent.firstName,
              parentMiddleName:res.parent.middleName,
              parentLastName:res.parent.lastName,
              
              classesId:res.classes.id,
              classesName:res.classes.name
              
            });
            obj.isAddUser=false;
            obj.isEditUser=true;
            obj.isListUser=false;
            obj.parentData = classes;
        }
        });
      });
    }

    onSubmit(value) {
      console.log("onSubmit");
      console.log(value);
      var obj = this;
      var student ={
        id:value.id,
        firstName:value.firstName,
        middleName:value.middleName,
        lastName:value.lastName,
        status:value.status,
        schoolId:this.schoolId,
        parent:{
          id:value.parentId,
          firstName:value.parentFirstName,
          middleName:value.parentMiddleName,
          lastName:value.parentLastName,
          user:{
            email:value.parentEmail,
            assignedRole:['PARENT']
          }
        },
        classes:{
          id:value.classesId
        }
     }
      console.log(student,value.id);
      if(value.id){
      console.log(student,value.id);
      this.studentService.put(null,student,function(){
          obj.router.navigate(['pages/student']);
          obj.isAddUser=false;
          obj.isEditUser=false;
          obj.isListUser=true;
          obj.loadData();

        });
        }else{
            this.studentService.post(student,function(){
                obj.router.navigate(['pages/student']);
                obj.isAddUser=false;
                obj.isEditUser=false;
                obj.isListUser=true;
                obj.loadData();
            });
        }
      
    }

    getClassList(callback){
      var obj = this;
      if(this.schoolId){
        
        // schoolId = this._globalService.loggedUser$.subscribe
        this.studentService.getClassList(this.schoolId,function(res){
          if(res){
            obj.classData = res;
            callback();
          }
        });
      }
    }

    addUser(){
      var obj = this;
      this.getClassList(function(){
        
      });
      obj.isAddUser=true;
        obj.isEditUser=false;
        obj.isListUser=false;
        obj.classData = null;
        obj.form = this.fb.group({
          id:0,
          firstName:"",
          middleName:"",
          lastName:"",
          status:true,
          parentId:"",
          parentEmail:"",
          parentFirstName:"",
          parentMiddleName:"",
          parentLastName:"",
          classesId:"",
          classesName:""
          
        });
   
    }

    resetForm(){
     
    }

    deleteUser(id){
      console.log(this.parentData,id);
      // if(this.parentData && this.parentData.id){
          this.studentService.delete(id,function(res){
              console.log("Delete Success")
          });
      // }else{
      //     alert("invalid request");
      // }
      //this.isListUser=true;
      //this.isEditUser=false;
      this.loadData();
    }

    pageChanged(pN: number): void {
      this.pageNumber = pN;
    }
}

