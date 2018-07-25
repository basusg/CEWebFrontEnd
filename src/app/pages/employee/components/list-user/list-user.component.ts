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
     @Input() config: any = {};
  @Input() resetUpload: boolean = this.config["resetUpload"];
  @Output() ApiResponse = new EventEmitter();


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
  get roleList():FormArray {
    console.log(this.form.get('roles'));
    //console.log(this.userData.roles);
    return this.form.get('roles') as FormArray;
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
    value.id = 0;
    if(this.userData){
        value.id=this.userData.id;
        value.createdTime = this.userData.createdAt;
        value.modifiedTime = this.userData.modifiedAt;
        value['schoolId']=this.userData['schoolId'];
        value['roles']=this.userData['roles'];
        
        var assignedRoles = [];
    var roles = this.roles.roleList;
    console.log("roles",roles);
    var assRoles=value['roles'];
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
    
    value['assignedRole'] = assignedRoles;
        
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
        value['roles']=role;
        value['createdBy']=createdBy;
        value['assignedRole'] = assRole;
    }
    
    
    console.log(value);
    console.log('this.userData',value);
    var obj = this;
    if(value.id){
    this.employeeService.putEmployee(value.id,value,function(){});
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
    this.resetUpload = false;
    this.dpImg='assets/images/avatar.png'
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
    this.uploadForm=false;
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
    this.employeeService.getAllEmployee(function(res){
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
  console.log(this.employeeService.getData());
  this.dpImg='assets/images/avatar.png';
  this.resetForm();
  this.isEditUser=true;
  this.userData = null;
    //var user = this.employeeService.getData(id);
    console.log("id"+id);
    //this.router.navigate(['pages/employee/view-user', id]);
    this.isListUser=false;
    //this.isViewUser=true;
    var userData = this.employeeService.getUser(id);
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.middleName = userData.middleName;
    var rolesCheckbox=[];
    for(var i=0;i<this.roles.roleList.length;i++){
    //console.log(this.roles.roleList[i].id);
        var roleObj;
        var role = this.roles.roleList[i];
        //roleObj['id'] = role.id;
        //roleObj['name'] = role.role;
        console.log("i = "+role.role);
        for(var j=0;j<userData.roles.length;j++){
            var selectRoles = userData.roles[j];
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
    this.userData = userData;
    console.log('role ',role,userData);
    var createdAt = userData.createdTime+''.split('');
    createdAt = createdAt[6]+createdAt[7]+'/'+createdAt[4]+createdAt[5]+'/'+createdAt[0]+createdAt[1]+createdAt[2]+createdAt[3]
    +' '+createdAt[8]+createdAt[9]+':'+createdAt[10]+createdAt[11]+':'+createdAt[12]+createdAt[13];
    
    var modAt = userData.createdTime+''.split('');
    modAt = modAt[6]+modAt[7]+'/'+modAt[4]+modAt[5]+'/'+modAt[0]+modAt[1]+modAt[2]+modAt[3]
    +' '+modAt[8]+modAt[9]+':'+modAt[10]+modAt[11]+':'+modAt[12]+modAt[13];
    this.dpImg = userData.dpImg;
    this.form = this.fb.group({
        email:userData.email,
        createdBy:userData.createdBy,
        firstName:userData.firstName,
        middleName:userData.middleName,
        lastName:userData.lastName,
        createdAt:createdAt,
        modifiedAt:modAt,
        roles: this.buildRoles()
     });
     console.log(this.roles.roleList);
     //console.log(this.roles.roleList.controls);
     console.log("USerData: ",this.userData);
  }
  
  buildRoles() {
    const arr = this.roles.roleList.map(role => {
    console.log("MNB ",role,this.fb.control(role.selected));
      return this.fb.control(role.selected);
    });
    console.log(arr);
    return this.fb.array(arr);
  }

drop(event: any) {
    event.stopPropagation();
    event.preventDefault();
    // console.log("drop: ", event);
    // console.log("drop: ", event.dataTransfer.files);
    this.onChange(event);
  }
  allowDrop(event : any) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    //console.log("allowDrop: ",event)
  }


theme: string;
  id: number;
  hideProgressBar: boolean;
  maxSize: number;
  uploadAPI: string;
  formatsAllowed: string;
  multiple: boolean;
  headers: any;
  hideResetBtn: boolean;
  hideSelectBtn: boolean;
  uploadBtnText: string;

  idDate: number = +new Date();
  reg: RegExp = /(?:\.([^.]+))?$/;
  selectedFiles: Array<any> = [];
  notAllowedList: Array<Object> = [];
  Caption: Array<string> = [];
  singleFile = true;
  progressBarShow = false;
  uploadBtn = false;
  uploadMsg = false;
  afterUpload = false;
  uploadClick = true;
  uploadMsgText: string;
  uploadMsgClass: string;
  percentComplete: number;

initChanges() {
console.log("ngChange");
    //if (rst["config"]) {
      this.theme = this.config["theme"] || "";
      this.id =
        this.config["id"] ||
        parseInt((this.idDate / 10000).toString().split(".")[1]) +
          Math.floor(Math.random() * 20) * 10000;
      this.hideProgressBar = this.config["hideProgressBar"] || false;
      this.hideResetBtn = this.config["hideResetBtn"] || false;
      this.hideSelectBtn = this.config["hideSelectBtn"] || false;
      this.uploadBtnText = this.config["uploadBtnText"] || "Upload";
      this.maxSize = this.config["maxSize"] || 20;
      this.uploadAPI = "http://localhost:8080/user/uploadDP";//this.config["uploadAPI"]["http://localhost:8080/user"];
      this.formatsAllowed =
        this.config["formatsAllowed"] || ".jpg,.png,.pdf,.docx,.txt,.gif,.jpeg";
      this.multiple = this.config["multiple"] || false;
      this.headers ={
            authorization : 'Basic ' + btoa('lokesh@gmail.com:mnb'),
            'content-type' : 'multipart/form-data',
            accept : 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':'true',
            withCredentials:'true'
        };//this.config["uploadAPI"]["headers"] || {};
      //console.log("config: ", this.config);
      //console.log(this.config["maxSize"]);
      //console.log(this.headers);
      //console.log("rst: ", rst);
    //}
    //if (rst["resetUpload"]) {
      //if (rst["resetUpload"].currentValue === true) {
        //this.resetFileUpload();
      //}
    //}
}

  

  resetFileUpload() {
    this.selectedFiles = [];
    this.Caption = [];
    this.notAllowedList = [];
    this.uploadMsg = false;
    this.uploadBtn = false;
  }

onChange(event) {
    //console.log(this.maxSize + this.formatsAllowed + this.multiple);
    this.initChanges();
    this.notAllowedList = [];
    //console.log("onchange hit");
    if (this.afterUpload || !this.multiple) {
      this.selectedFiles = [];
      this.Caption = [];
      this.afterUpload = false;
    }
    //FORMATS ALLOWED LIST
    //console.log("FORMATS ALLOWED LIST= "+this.formatsAllowed);
    //NO OF FORMATS ALLOWED
    let formatsCount: any;
    console.log(this.formatsAllowed);
    formatsCount = this.formatsAllowed.match(new RegExp("\\.", "g"));
    formatsCount = formatsCount.length;
    //console.log("NO OF FORMATS ALLOWED= "+formatsCount);
    //console.log("-------------------------------");
    //ITERATE SELECTED FILES
    let file : FileList;
    if (event.type == "drop") {
      file = event.dataTransfer.files;
      // console.log("type: drop");
    } else {
      file = event.target.files || event.srcElement.files;
      // console.log("type: change");
    }
    // console.log(file);
    let currentFileExt: any;
    let ext: any;
    let frmtAllowed: boolean;
    for (let i = 0; i < file.length; i++) {
      //CHECK FORMAT
      //CURRENT FILE EXTENSION
      currentFileExt = this.reg.exec(file[i].name);
      currentFileExt = currentFileExt[1];
      //console.log(file[i].name);
      frmtAllowed = false;
      //FORMAT ALLOWED LIST ITERATE
      for (let j = formatsCount; j > 0; j--) {
        ext = this.formatsAllowed.split(".")[j];
        //console.log("FORMAT LIST ("+j+")= "+ext.split(",")[0]);
        if (j == formatsCount) {
          ext = this.formatsAllowed.split(".")[j] + ",";
        } //check format
        if (currentFileExt.toLowerCase() == ext.split(",")[0]) {
          frmtAllowed = true;
        }
      }

      if (frmtAllowed) {
        //console.log("FORMAT ALLOWED");
        //CHECK SIZE
        if (file[i].size > this.maxSize * 1024000) {
          //console.log("SIZE NOT ALLOWED ("+file[i].size+")");
          this.notAllowedList.push({
            fileName: file[i].name,
            fileSize: this.convertSize(file[i].size),
            errorMsg: "Invalid size"
          });
          continue;
        } else {
          //format allowed and size allowed then add file to selectedFile array
          this.selectedFiles.push(file[i]);
        }
      } else {
        //console.log("FORMAT NOT ALLOWED");
        this.notAllowedList.push({
          fileName: file[i].name,
          fileSize: this.convertSize(file[i].size),
          errorMsg: "Invalid format"
        });
        continue;
      }
    }

    if (this.selectedFiles.length !== 0) {
      this.uploadBtn = true;
      if (this.theme == "attachPin") this.uploadFiles();
    } else {
      this.uploadBtn = false;
    }
    this.uploadMsg = false;
    this.uploadClick = true;
    this.percentComplete = 0;
    event.target.value = null;
  }
  
   uploadFiles() {
    //console.log(this.selectedFiles);
    let i: any;
    this.progressBarShow = true;
    this.uploadClick = false;
    this.notAllowedList = [];
    let isError = false;

    let xhr = new XMLHttpRequest();
    let formData = new FormData();

    for (i = 0; i < this.selectedFiles.length; i++) {
      if (this.Caption[i] == undefined) this.Caption[i] = "file";
      //Add DATA TO BE SENT
      formData.append(
        this.Caption[i],
        this.selectedFiles[i] /*, this.selectedFiles[i].name*/
      );
      //console.log(this.selectedFiles[i]+"{"+this.Caption[i]+" (Caption)}");
    }

    if (i > 1) {
      this.singleFile = false;
    } else {
      this.singleFile = true;
    }

    xhr.onreadystatechange = evnt => {
      //console.log("onready");
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          isError = true;
          this.progressBarShow = false;
          this.uploadBtn = false;
          this.uploadMsg = true;
          this.afterUpload = true;
          this.uploadMsgText = "Upload Failed !";
          this.uploadMsgClass = "text-danger lead";
        }
          this.ApiResponse.emit(xhr);
      }
    };

    xhr.upload.onprogress = evnt => {
      this.uploadBtn = false; // button should be disabled by process uploading
      if (evnt.lengthComputable) {
        this.percentComplete = Math.round(evnt.loaded / evnt.total * 100);
      }
      //console.log("Progress..."/*+this.percentComplete+" %"*/);
    };

    xhr.onload = evnt => {
      //console.log("onload");
      //console.log(evnt);
      this.progressBarShow = false;
      this.uploadBtn = false;
      this.uploadMsg = true;
      this.afterUpload = true;
      if (!isError) {
        this.uploadMsgText = "Successfully Uploaded !";
        this.uploadMsgClass = "text-success lead";
        //console.log(this.uploadMsgText + " " + this.selectedFiles.length + " file");
      }
    };

    xhr.onerror = evnt => {
      //console.log("onerror");
      //console.log(evnt);
    };

    xhr.open("POST", this.uploadAPI, true);
    for (const key of Object.keys(this.headers)) {
      // Object.keys will give an Array of keys
      xhr.setRequestHeader(key, this.headers[key]);
    }
    //let token = sessionStorage.getItem("token");
    //xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    //xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(formData);
  }

  removeFile(i: any, sf_na: any) {
    //console.log("remove file clicked " + i)
    if (sf_na == "sf") {
      this.selectedFiles.splice(i, 1);
      this.Caption.splice(i, 1);
    } else {
      this.notAllowedList.splice(i, 1);
    }

    if (this.selectedFiles.length == 0) {
      this.uploadBtn = false;
    }
  }

  convertSize(fileSize: number) {
    //console.log(fileSize + " - "+ str);
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + " KB"
      : (fileSize / 1024000).toFixed(2) + " MB";
  }

}

