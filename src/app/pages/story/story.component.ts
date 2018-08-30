import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoryService } from './services/story.service';
import { FileUploader } from 'ng2-file-upload';
import { SelectItem } from '../../../../node_modules/ng2-select';
// import {RestCallService} from '../../../service/restCall.service'
// import pell from 'pell';

// import pell from '../../shared/components/pell/pell.component';

let URL:string = 'http://localhost:8080/snap/uploadFile';
@Component({
  selector: 'app-editor',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  providers:[StoryService]
})
export class StoryComponent implements OnInit {
  // defaultContent = '<h3>Friday favorites - Homemade pizza</h3><p><br></p><p>Friday is finally here! I know it’s been an exhausting week and the last thing on your mind right</p><p> now is getting stuck in the kitchen preparing a snack to accompany you during your regular Netflix session.</p><img src="http://f10.baidu.com/it/u=870634439,1838112237&amp;fm=72">'

  
  loggedUser;
  contentBody = "Please enter text content here...";
  contentTitle = "Story Title...";
  private authHeader:any[] = new Array() ;
  private header:any;
  constructor(private storyService:StoryService) { 
    this.header = storyService.getHeader();
console.log(this.header);
// this.fileUploaderOptions = JSON.parse(this.authHeader);
var headerJson = JSON.parse(this.header);
    var userLocal = localStorage.getItem('loggedUser');//, JSON.stringify(user));
    var authKey = "";
    authKey = headerJson.authorization;
    console.log(userLocal);
    
      if(userLocal){
        var user = JSON.parse(userLocal);
        this.loggedUser = user;
        URL+= "/"+user.id;
      }
      console.log(user,authKey);
      this.uploader = new FileUploader({
    
        headers:headerJson,//this.authHeader,
        method:'POST',
        url: URL ,
        
        });
        this.uploader.authToken = authKey;
        var obj = this;
        this.uploader.onCompleteItem = (item:any, res:any, status:any, headers:any) => {
          console.log("ImageUpload:uploaded:", item, status);
          console.log(obj.uploader);
          console.log(res);
          var jsonRes = JSON.parse(res);
          console.log(jsonRes);
          var content = "";
          if(jsonRes && !jsonRes.success){
            if(jsonRes.type == 'IMAGE'){
              // obj.exec('insertImage','http://localhost:8080/snap/file/'+jsonRes.id);
              obj.exec('insertHtml','<img width="75%" height="75%" src="http://localhost:8080/snap/file/'+jsonRes.id+'" alt="'+jsonRes.caption+'">');
              // content = '<img src="http://localhost:8080/snap/file/'+jsonRes.id+'" alt="Smiley face">'
            }else if(jsonRes.type == 'DOC'){
              // obj.exec('insertImage','http://localhost:8080/snap/file/'+jsonRes.id);
              obj.exec('insertHtml','<embed width="75%" height="75%" style="margin-left:auto;margin-right:auto" src="http://localhost:8080/snap/file/'+jsonRes.id+'" width="800px" height="2100px" />');
              // content = '<img src="http://localhost:8080/snap/file/'+jsonRes.id+'" alt="Smiley face">'
            }
            
          }else{
            alert("File upload failed")
          }
          // obj.contentBody += content;
      };

    this.loadData();
}
 @Input() defaultContent: string = '<i>Please enter content...</i>';

  // @Output() content = new EventEmitter<string>();
  ngOnInit() {
    // this.editorInit();
    // this.loadData();
  }

  //Modal
//File Uploader
  public uploader: FileUploader;// = new FileUploader({headers:that.authHeader, url: URL });
  // public uploader: FileUploader = new FileUploader({headers:that.authHeader, url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    // console.log(this.uploader.queue);
    console.log(this.uploader.queue.length);
    if(this.uploader.queue && this.uploader.queue.length>1){
      this.uploader.queue.shift();
    }
    console.log(this.uploader);
  }

  openModal(modal) {
    console.log("MNB Open");
    modal.open();
  }

  closeModal(modal) {
    console.log("MNB Close");
    modal.close();
    console.log(this.uploader.progress);
    if(this.uploader.progress == 100){}
  }
  
  loadData(){
    this.getStudents();
    this.getLearningTags();
  }
  
  //Editor 
  exec = (command, value = null) => {
    console.log("cmd "+command);
    document.execCommand(command, false, value)

  }
  changeStyle(cmd:String){
    console.log("clicked");
    console.log(cmd);
    this.exec(cmd);
  }
  changeStyleWValue(cmd:String,value:String){
    console.log("clicked");
    console.log(cmd);
    console.log(value);
    this.exec(cmd,'<'+value+'>');
  }

  onActionPerform(event: String){
    console.log("onActionPerform->event : "+event);
    console.log(this.contentTitle);
    console.log(this.contentBody);
    console.log(this.value);
    var snaps = [];
    this.value.forEach(element => {
      // console.log(element.id);
      snaps.push(element.id);
    });
    console.log(this.valueL);

    var learnTag = [];
    this.valueL.forEach(element => {
      console.log(element.id);
      learnTag.push(element.id);
    });

    console.log(document.getElementById('contentBody'));
    console.log(document.getElementById('contentBody').innerHTML);
    this.contentTitle = document.getElementById('contentTitle').innerHTML;
    this.contentBody = document.getElementById('contentBody').innerHTML
    if(this.value.length<1 && this.valueL.length<1){
      alert("Please tag children or Learning tags in to the story")
      return;
    }

    var story = {
      schoolId:this.loggedUser.schoolId,
      userId:this.loggedUser.id,
      caption:this.contentTitle,
      text:this.contentBody,
      status:'DRAFT',
      type:'STORY',
      taggedStudent:snaps,
      associatedTags:learnTag
    }

    console.log(story);
    this.storyService.postStory(story,function(res){
      console.log("Adding Story res:");
      console.log(res);
    })
    // console.log(document.getElementById('contentBody'));

  }

  //Student

  public childrenItems=[];

    public value: any = [];
  public _disabledV: string = '0';
  public disabled: boolean = false;

  childrenData;
  getStudents(){
    var obj = this;
    this.storyService.getAllChildren(null,function(res){
      obj.childrenData = res;
      console.log("getStudents");
      console.log(res);
      // obj.childrenItems.push({id: 0, text: "res[i].firstName"});
      if(res){
        var arr = []
        for(var i=0;i<res.length;i++) {
          if(res[i].id){
            arr.push({id: res[i].id, text: res[i].firstName});
          }
        }
      obj.childrenItems=arr;
      console.log(obj.childrenItems);
      }
    });
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    console.log("MNB"+value);
    this.value = value;
  }

  public itemsToString(value: Array<any> = []) {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }

  //Learning

  public learningItems=[];

    public valueL: any = [];
  public _disabledV_L: string = '0';
  public disabledL: boolean = false;

  learningData;
  learnTagValue="";

  tagTyped(e:any){
    this.learnTagValue = e;
  }

  addNewLearningTag(){
    var tag = {
      schoolId: this.loggedUser.schoolId,
      userId:this.loggedUser.user.id,
      tag:this.learnTagValue,
      descrition:this.learnTagValue
    }
    var obj = this;
    this.storyService.postLearningTag(tag,function(){
      obj.getLearningTags();
    })
  }
  getLearningTags(){
    var obj = this;
    console.log(obj.loggedUser)
    var userId;
    if(obj.loggedUser && obj.loggedUser.user){
      userId = obj.loggedUser.user.id;
    }
    this.storyService.getTagsByUser(userId,function(res){
      obj.learningData = res;
      console.log("geLearnign");
      console.log(res);
      // obj.childrenItems.push({id: 0, text: "res[i].firstName"});
      if(res){
        var arr = []
        for(var i=0;i<res.length;i++) {
          if(res[i].id){
            arr.push({id: res[i].id, text: res[i].tag});
          }
        }
      obj.learningItems=arr;
      console.log(obj.learningItems);
      }
    });
  }


  public selectedL(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removedL(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValueL(value: any): void {
    console.log("MNB"+value);
    this.valueL = value;
  }

  public itemsToStringL(value: Array<any> = []) {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }
}


