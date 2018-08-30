import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {RestCallService} from '../../../service/restCall.service'
// import { HttpHeaders } from '../../../../../../node_modules/@angular/common/http';
// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

const URL = 'http://localhost:8080/snap/uploadFile';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  // private fileUploaderOptions:FileUploaderOptions;
  // private authHeader:Array<Headers> ;
  private authHeader:any[] = new Array() ;
  private header:any;
  constructor(private restService: RestCallService) { 
this.header = restService.getHeader();

// this.fileUploaderOptions = JSON.parse(this.authHeader);
var headerJson = JSON.parse(this.header);
console.log(headerJson);
var i =0;
var authToken="";
for (var key in headerJson) {
  let head:Headers = new Headers();
  console.log("Element: "+headerJson[key]);
  // head.set("name",key);
  // head.set("value",headerJson[key]);
  // head.append(key,headerJson[key])
  var header = {name:key,value:headerJson[key]};
  if(key =='content-type'){
    header = {name:key,value:'multipart/form-data'};
  }
  if(key =='authorization'){
    authToken = headerJson[key];
  }

  this.authHeader.push(header);
  i++;
}
console.log(this.authHeader);
// headers:this.authHeader
// var that = this;
  this.uploader = new FileUploader({
    
    headers:headerJson,//this.authHeader,
    method:'POST',
    url: URL ,
    
    });
  
  this.uploader.authToken = authToken;

// this.authHeader.append(name:) = new Headers(JSON.parse(this.header));
  }

  ngOnInit() { }
  
  public uploader: FileUploader;// = new FileUploader({headers:that.authHeader, url: URL });
  // public uploader: FileUploader = new FileUploader({headers:that.authHeader, url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(this.uploader);
    if(this.uploader.queue && this.uploader.queue.length>0){
      this.uploader.queue.shift();
    }
    // for(var item in this.uploader.queue){
    //   console.log(item);
    // }
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
