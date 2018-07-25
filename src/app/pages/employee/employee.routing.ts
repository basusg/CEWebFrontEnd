import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const childRoutes: Routes = [
    {
        path: '',
        component: EmployeeComponent,
        children: [
            { path: '', redirectTo: 'list-user', pathMatch: 'full' },
            { path: 'list-user', component: ListUserComponent },
            { path: 'view-user/:id', component: ViewUserComponent },
            {path: 'list-user/**',redirectTo: ''}
            //{ path: 'data-table', component: DataTableComponent },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
