import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './story.routing';
import { SharedModule } from '../../shared/shared.module';
import { StoryComponent } from './story.component';
import { StoryViewComponent } from './view/story-view.component';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ngx-modal';
import { FileUploadModule } from 'ng2-file-upload';
// import { StoryComponent } from './story.component;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,
        SelectModule,
        ModalModule,
        FileUploadModule
    ],
    declarations: [
        StoryComponent,
        StoryViewComponent
    ]
})
export class StoryModule { }
