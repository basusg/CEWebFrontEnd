import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './student.component';
import { ListStudentComponent } from './components/view/list-student.component';
//import { ViewUserComponent } from './components/view-user/view-user.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ClassComponent,
        children: [
            { path: '', redirectTo: 'list-student', pathMatch: 'full' },
            { path: 'list-student', component: ListStudentComponent },
           //{ path: 'view-user/:id', component: ViewUserComponent },
            // {path: 'class/**',redirectTo: ''}
            //{ path: 'data-table', component: DataTableComponent },
        ]
    }  
];

export const routing = RouterModule.forChild(childRoutes);
