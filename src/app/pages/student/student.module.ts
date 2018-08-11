import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './student.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

/* components */
import { ClassComponent } from './student.component';
import { ListStudentComponent } from './components/view/list-student.component';
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
        ListStudentComponent,
        // ViewUserComponent
    ]
})
export class StudentModule { }
