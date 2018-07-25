import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './classes.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

/* components */
import { ClassComponent } from './classes.component';
import { ListClassComponent } from './components/class/list-class.component';
//import { ViewUserComponent } from './components/view-user/view-user.component';

@NgModule({
    imports: [
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        ClassComponent,
        ListClassComponent,
        // ViewUserComponent
    ]
})
export class ClassModule { }
