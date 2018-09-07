import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoryService } from '../services/story.service';
// import { FileUploader } from 'ng2-file-upload';
// import { SelectItem } from '../../../../../node_modules/ng2-select';
// import {RestCallService} from '../../../service/restCall.service'
// import pell from 'pell';

// import pell from '../../shared/components/pell/pell.component';

let URL:string = 'http://localhost:8080/snap/uploadFile';
@Component({
  selector: 'app-editor',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story.-listcomponent.scss'],
  providers:[StoryService]
})
export class StoryComponent implements OnInit {
  // defaultContent = '<h3>Friday favorites - Homemade pizza</h3><p><br></p><p>Friday is finally here! I know it’s been an exhausting week and the last thing on your mind right</p><p> now is getting stuck in the kitchen preparing a snack to accompany you during your regular Netflix session.</p><img src="http://f10.baidu.com/it/u=870634439,1838112237&amp;fm=72">'

  constructor(private storyService:StoryService) { 

  }
//  @Input() defaultContent: string = '<i>Please enter content...</i>';

  // @Output() content = new EventEmitter<string>();
  ngOnInit() {
  }

 
}


