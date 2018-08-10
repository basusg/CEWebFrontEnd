import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import {Router} from "@angular/router";
//import { ListUserService } from './list-user.service';
//import { RestCallService } from '../../../service/restCall.service';
import { EmployeeService } from '../../services/employee.service';
import {FormBuilder, FormGroup, FormArray,FormControl, Validators} from '@angular/forms';

import { GlobalService } from '../../../../shared/services/global.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [EmployeeService]
})
export class ListUserComponent implements OnInit {
  
  tableData: Array<any>;
  isListUser=false;
  isEditUser=false;
  isAddUser=false;
  uploadForm=false;
  userData;
  roles={roleList:[]};
  //roles["roleList"]={};
  form:FormGroup;
  selectedRoles=new Array();
  
  
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  constructor(private employeeService: EmployeeService,private router:Router,private fb:FormBuilder,public _globalService: GlobalService) {
    this.isListUser=true;
    this.form = this.fb.group({
        email:"",
        createdBy:"",
        firstName:"",
        middleName:"",
        lastName:"",
        createdAt:"",
        modifiedAt:"",
        roles: this.buildRoles()
     });
  
  }
  get roleList() {
    // console.log(this.form.get('roles'));
    //console.log(this.userData.roles);
    return this.form.get('roles');
  }
 
  deleteUser(){
    if(this.userData && this.userData.id){
        this.employeeService.deleteEmployee(this.userData.id,function(res){
            console.log("Delete Success")
        });
    }else{
        alert("invalid request");
    }
    //this.isListUser=true;
    //this.isEditUser=false;
    this.loadData();
  }
  
  onSubmit(value) {
  console.log("OnSubmit");
  console.log(this.loggedUser);
    var schoolId = this.loggedUser.schoolId;
    var createdBy = this.loggedUser.createdBy;
    console.log("Submited");
    console.log(this.userData);
    console.log(value);
    console.log(this.roles);
    console.log(this.roleList);
    console.log(this.roleList.value);
    
    value.id = 0;
    if(this.userData){
        value.id=this.userData.id;
        value.createdTime = this.userData.createdAt;
        value.modifiedTime = this.userData.modifiedAt;
        value['schoolId']=this.userData['schoolId'];
        value['user']=this.userData.user;
        //value['roles']=this.roleList.value;
        
        var assignedRoles = [];
    var roles = this.roles.roleList;
    console.log("roles",roles);
    var assRoles=this.roleList.value;
    console.log("assRoles",assRoles);
    var j=0;
    for(var i=0;i<roles.length;i++){
        if(assRoles[i] == true){
            if(roles[i].role){
                assignedRoles[j] = roles[i].role;
            }else{
                assignedRoles[j] = roles[i];
            }
            j++;
        }
    }
    
    value.user['assignedRole'] = assignedRoles;
        
    }else{
      
        value['schoolId']=schoolId;
        var role = [];
        var assRole = [];
        var j =0;
        var k =0;
        for(var i =0;i<this.roles.roleList.length;i++){
            if(value.roles[i]){
                role[j] = this.roles.roleList[i];
                j++;
            }
            if(value.roles[i]){
                assRole[k] = this.roles.roleList[i].role;
                k++;
            }
        }
        console.log(role);
        value['user']={email:value['email']};
        value['roles']=role;
        value['createdBy']=createdBy;
        value.user['assignedRole'] = assRole;
    }
    
    
    console.log(value);
    console.log('this.userData',value);
    var obj = this;
    if(value.id){
    this.employeeService.putEmployee(value,function(){});
    }else{
        this.employeeService.postEmployee(value,function(){
            obj.router.navigate(['pages/employee/list-user']);
        });
    }
    //this.isListUser=true;
    //this.isEditUser=false;
    this.loadData();
  }
  dpImg='assets/images/avatar.png';
  loggedUser;
  ngOnInit() {
    this.loadData();
    
    this.dpImg='assets/images/avatar.png';
    console.log("ngInit");
    
    let loggedUser;
    if (localStorage.getItem('loggedUser'))
       loggedUser = localStorage.getItem('loggedUser');
    console.log(loggedUser)
    this.loggedUser = JSON.parse(loggedUser) ;
  }
  firstName='';
  middleName='';
  lastName='';
  
  addUser(){
  this.isAddUser=true;
  this.isEditUser=false;
  this.isListUser=false;
  this.userData = null;
    this.form = this.fb.group({
        email:"",
        createdBy:"",
        firstName:"",
        middleName:"",
        lastName:"",
        dpImg:'assets/images/avatar.png',
        createdAt:"",
        modifiedAt:"",
        roles: this.buildRoles()
     });
  }
  resetForm(){
    
    this.form = this.fb.group({
        email:"",
        createdBy:"",
        firstName:"",
        middleName:"",
        lastName:"",
        dpImg:'assets/images/avatar.png',
        createdAt:"",
        modifiedAt:"",
        roles: this.buildRoles()
     });
  }

  loadData() {
  console.log("onload");
  var obj = this;
    //this.tableData = this._tablesDataService.DATA;
    this.employeeService.getAllEmployee(null,function(res){
        console.log('callback');
        obj.employeeService.setData(res);
        //this.empList = res;
        obj.tableData = res;
        obj.isListUser=true;
        obj.isEditUser=false;
        //console.log(obj.employeeService.getData());
        });
    this.employeeService.getRole(function(res){
        console.log("getRole");
        console.log(res);
        obj.roles.roleList=res;
    });
    //var profile = new ProfileComponent(userData);
    
  }
  roleSelected(event,role){
    console.log("roleSelected");
    console.log(event);
    var target = event.target;
    console.log(target.checked);
    console.log(target.value);
    console.log(role);
    var arrObj:number[] = new Array(3)
    arrObj.push(1);
    
    if(target){
        if(target.checked && target.value){
        arrObj.push(role.id)
            //this.selectedRoles[role.id] = role.role;
        }else if(!target.checked && target.value){
            this.selectedRoles[role.id] = null;
        }
    }
    console.log(arrObj);
    //this.selectedRoles = mnb;
    console.log(this.selectedRoles);
    
  }
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  
  openUser(id){
  
  console.log("OpenUser: "+id);
  var obj = this;
  this.employeeService.getAllEmployee(id,function(res){
    //console.log(this.employeeService.getData());
    obj.dpImg='assets/images/avatar.png';
    obj.resetForm();
    obj.isEditUser=true;
    obj.userData = null;
    //var user = this.employeeService.getData(id);
    console.log("id"+id);
    //this.router.navigate(['pages/employee/view-user', id]);
    obj.isListUser=false;
    //this.isViewUser=true;
    var userData = res;//this.employeeService.getUser(id);
    obj.firstName = userData.firstName;
    obj.lastName = userData.lastName;
    obj.middleName = userData.middleName;
    var rolesCheckbox=[];
    for(var i=0;i<obj.roles.roleList.length;i++){
    //console.log(this.roles.roleList[i].id);
        var roleObj;
        var role = obj.roles.roleList[i];
        //roleObj['id'] = role.id;
        //roleObj['name'] = role.role;
        console.log("i = "+role.role);
        for(var j=0;j<userData.user.roles.length;j++){
            var selectRoles = userData.user.roles[j];
            console.log("role==selectRoles: ",role.role,selectRoles.role);
            //roleObj['selected'] = false;
            role.selected = false;
            if(role.role==selectRoles.role){
                role.selected = true;
                //i++;
                break;
            }
        }
    }
    //this.roles
    obj.userData = userData;
    console.log('role ',role,userData);
    var createdAt = userData.createdTime!=0?userData.createdTime+''.split(''):0;
    if(createdAt.length>0)
    createdAt = createdAt[6]+createdAt[7]+'/'+createdAt[4]+createdAt[5]+'/'+createdAt[0]+createdAt[1]+createdAt[2]+createdAt[3]
    +' '+createdAt[8]+createdAt[9]+':'+createdAt[10]+createdAt[11]+':'+createdAt[12]+createdAt[13];
    
    var modAt = userData.modifiedTime!=0?userData.modifiedTime+''.split(''):0;
    if(modAt.length>0)
    modAt = modAt[6]+modAt[7]+'/'+modAt[4]+modAt[5]+'/'+modAt[0]+modAt[1]+modAt[2]+modAt[3]
    +' '+modAt[8]+modAt[9]+':'+modAt[10]+modAt[11]+':'+modAt[12]+modAt[13];
    obj.dpImg = userData.dpImg?userData.dpImg:obj.dpImg;
    obj.form = obj.fb.group({
        email:userData.user.email,
        createdBy:userData.createdBy,
        firstName:userData.firstName,
        middleName:userData.middleName,
        lastName:userData.lastName,
        createdAt:createdAt,
        modifiedAt:modAt,
        roles: obj.buildRoles()
     });
     console.log(obj.roles.roleList);
     //console.log(this.roles.roleList.controls);
     console.log("USerData: ",obj.userData);
  });
  
  }
  
  buildRoles() {
    const arr = this.roles.roleList.map(role => {
    console.log("MNB ",role,this.fb.control(role.selected));
      return this.fb.control(role.selected);
    });
    console.log(arr);
    return this.fb.array(arr);
  }

}