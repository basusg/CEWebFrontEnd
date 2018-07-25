import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './employee.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

/* components */
import { EmployeeComponent } from './employee.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

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
        EmployeeComponent,
        ListUserComponent,
        ViewUserComponent
    ]
})
export class EmployeeModule { }
