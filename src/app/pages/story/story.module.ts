import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './story.routing';
//import { SharedModule } from '../../shared/shared.module';
import { StoryComponent } from './story.component';
// import { StoryComponent } from './story.component;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        //SharedModule,
        routing
    ],
    declarations: [
        StoryComponent
    ]
})
export class StoryModule { }
