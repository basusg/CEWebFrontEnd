import { Component, OnInit} from '@angular/core';
import { StoryService } from '../services/story.service';
import { FileUploader } from 'ng2-file-upload';
// import { SelectItem } from '../../../../../node_modules/ng2-select';
import { ActivatedRoute } from '@angular/router';
// import {RestCallService} from '../../../service/restCall.service'
// import pell from 'pell';

// import pell from '../../shared/components/pell/pell.component';

let URL:string = 'http://localhost:8080/snap/uploadFile';
@Component({
  selector: 'app-editor',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss'],
  providers:[StoryService]
})
export class StoryViewComponent implements OnInit {
  // defaultContent = '<h3>Friday favorites - Homemade pizza</h3><p><br></p><p>Friday is finally here! I know it’s been an exhausting week and the last thing on your mind right</p><p> now is getting stuck in the kitchen preparing a snack to accompany you during your regular Netflix session.</p><img src="http://f10.baidu.com/it/u=870634439,1838112237&amp;fm=72">'

  storyId=0;
  contentBody = "";
  contentTitle = "";
  studentList=[];
  tagList=[];
  constructor(private storyService:StoryService,private route: ActivatedRoute) { 
     this.route.params.subscribe(params => {
        console.log(params);
        console.log("id: "+params['id']);
        this.storyId = params['id'];
     });
     this.loadData();
  }
  ngOnInit() {}

  loadData(){
    var obj = this;
    this.storyService.getAllEmployee(this.storyId,function(res){
      console.log("res: "+res);
      document.getElementById('pellTitle').innerHTML = res.caption;
      document.getElementById('pellBody').innerHTML = res.text;
      // obj.contentBody=res.text;
      // obj.contentTitle = res.caption;
      obj.studentList = res.student;
      obj.tagList = res.tags;
    })
  }
  
}


